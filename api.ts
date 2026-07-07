import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

let aiInstance: GoogleGenAI | null = null;

function getAiInstance(customApiKey?: string): GoogleGenAI {
  let apiKey = (customApiKey && customApiKey !== 'undefined' && customApiKey !== 'null' && customApiKey.trim() !== '') ? customApiKey.trim().replace(/^["']|["']$/g, '') : '';
  
  const isCustomUsed = !!apiKey;

  if (!apiKey) {
    apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
    apiKey = apiKey.trim().replace(/^["']|["']$/g, '');
  }

  if (apiKey === 'undefined' || apiKey === 'null' || !apiKey) {
    throw new Error('مفتاح الـ API لـ Gemini غير متوفر. يرجى إدخال مفتاح الـ API الخاص بك في الخانة المحددة في واجهة التطبيق أو ضبطه في الـ Secrets.');
  }

  // If a custom key is provided, we create a fresh instance for this request
  if (isCustomUsed) {
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

router.get('/health', (req, res) => {
  const customKeyHeader = req.headers['x-gemini-api-key'] as string;
  const customKey = (customKeyHeader && customKeyHeader !== 'undefined' && customKeyHeader !== 'null' && customKeyHeader.trim() !== '') ? customKeyHeader.trim().replace(/^["']|["']$/g, '') : '';
  const apiKey = customKey || (process.env.GEMINI_API_KEY || process.env.API_KEY || '').trim().replace(/^["']|["']$/g, '');
  res.json({ status: 'ok', hasApiKey: !!apiKey && apiKey !== 'undefined' && apiKey !== 'null' });
});

// Check if an error should trigger a retry
function isRetriableError(err: any): boolean {
  if (!err) return false;
  const status = err.status || err.code || '';
  const message = (err.message || String(err)).toLowerCase();

  // Authentication errors (403) or bad requests (400) should not be retried
  if (
    status === 400 ||
    status === 403 ||
    message.includes('api key') ||
    message.includes('invalid key') ||
    message.includes('unauthorized') ||
    message.includes('bad request') ||
    message.includes('400') ||
    message.includes('403')
  ) {
    return false;
  }

  return true;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

router.post('/gemini', async (req, res) => {
  try {
    const customKeyHeader = req.headers['x-gemini-api-key'] as string;
    const customKey = (customKeyHeader && customKeyHeader !== 'undefined' && customKeyHeader !== 'null' && customKeyHeader.trim() !== '') ? customKeyHeader.trim() : undefined;
    const ai = getAiInstance(customKey);
    const { contents, systemInstruction, temperature } = req.body;

    if (!contents || !Array.isArray(contents)) {
      res.status(400).json({ error: 'Missing or invalid contents' });
      return;
    }

    // List of models to try in sequence in case of transient issues (e.g., 503 high demand or 429 limits)
    // We prioritize gemini-3.1-flash-lite first to avoid global congestion on gemini-3.5-flash
    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.5-flash'];
    let lastError: any = null;
    let responseText: string | null = null;
    let chosenModel = '';

    for (const modelName of candidateModels) {
      let success = false;
      // Retry up to 3 times per model for retriable errors
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`[Gemini API Proxy] Attempt ${attempt} utilizing model: ${modelName}`);
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction,
              temperature: temperature ?? 0.7,
            }
          });

          responseText = response.text || '';
          chosenModel = modelName;
          console.log(`[Gemini API Proxy] Successful generation on attempt ${attempt} with model: ${modelName}`);
          success = true;
          break; // Break the attempt loop on success
        } catch (err: any) {
          lastError = err;
          const errMessage = err?.message || String(err);
          const errStatus = err?.status || err?.code || '';
          
          console.warn(`[Gemini API Proxy] Attempt ${attempt} failed with model ${modelName}. Status: ${errStatus}. Error: ${errMessage}`);
          
          // Detect 503 Service Unavailable or High Demand / Congestion
          const isHighDemand = errStatus === 503 || 
                               errStatus === '503' || 
                               errMessage.toLowerCase().includes('503') || 
                               errMessage.toLowerCase().includes('high demand') || 
                               errMessage.toLowerCase().includes('unavailable');
          
          if (isHighDemand) {
            console.warn(`[Gemini API Proxy] Model ${modelName} is experiencing high demand. Skipping subsequent attempts and switching immediately to the next candidate model...`);
            break; // Break the attempt loop for this model to try the next model
          }

          if (!isRetriableError(err)) {
            console.warn(`[Gemini API Proxy] Non-retriable error encountered. Aborting retries for model: ${modelName}`);
            break; // Break the attempt loop to try next model
          }

          if (attempt < 3) {
            const backoffMs = attempt * 1000;
            console.log(`[Gemini API Proxy] Retriable issue. Backing off for ${backoffMs}ms before retrying model ${modelName}...`);
            await delay(backoffMs);
          }
        }
      }

      if (success) {
        break; // Successfully got response, break candidate models loop
      }
    }

    if (responseText !== null) {
      res.json({ text: responseText, modelUsed: chosenModel });
    } else {
      throw lastError || new Error('All candidate Gemini models failed to generate content.');
    }
  } catch (error: any) {
    console.error('Error proxying Gemini API:', error);
    res.status(500).json({ error: error?.message || 'حصل خطأ أثناء الاتصال بالذكاء الاصطناعي.' });
  }
});

router.post('/tts', async (req, res) => {
  try {
    const customKeyHeader = req.headers['x-gemini-api-key'] as string;
    const customKey = (customKeyHeader && customKeyHeader !== 'undefined' && customKeyHeader !== 'null' && customKeyHeader.trim() !== '') ? customKeyHeader.trim() : undefined;
    const ai = getAiInstance(customKey);
    const { text, voiceName } = req.body;

    if (!text) {
      res.status(400).json({ error: 'Missing text content' });
      return;
    }

    let response: any = null;
    let lastError: any = null;
    let success = false;

    // Retry up to 3 times for TTS model
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[TTS API Proxy] Attempt ${attempt} calling gemini-3.1-flash-tts-preview`);
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-tts-preview',
          contents: [{ parts: [{ text }] }],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' } },
            },
          },
        });
        success = true;
        break;
      } catch (err: any) {
        lastError = err;
        const errMessage = err?.message || String(err);
        const errStatus = err?.status || err?.code || '';
        console.warn(`[TTS API Proxy] Attempt ${attempt} failed. Status: ${errStatus}. Error: ${errMessage}`);

        if (!isRetriableError(err)) {
          break;
        }

        if (attempt < 3) {
          const backoffMs = attempt * 1000;
          console.log(`[TTS API Proxy] Retriable error, waiting ${backoffMs}ms before retry...`);
          await delay(backoffMs);
        }
      }
    }

    if (!success || !response) {
      throw lastError || new Error('Failed to generate speech with the TTS model after retries.');
    }

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      res.status(500).json({ error: 'لم يتم إرجاع مقطع صوتي للجزء الحالي من النص.' });
      return;
    }

    res.json({ base64Audio });
  } catch (error: any) {
    console.error('Error proxying TTS API:', error);
    res.status(500).json({ error: error?.message || 'حصل خطأ أثناء توليد الصوت بالذكاء الاصطناعي.' });
  }
});

export default router;
