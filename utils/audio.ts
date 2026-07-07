
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

interface GeminiBlob {
  data: string;
  mimeType: string;
}

function createBlob(data: Float32Array): GeminiBlob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    // convert float32 -1 to 1 to int16 -32768 to 32767
    int16[i] = data[i] * 32768;
  }

  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const buffer = ctx.createBuffer(
    numChannels,
    data.length / 2 / numChannels,
    sampleRate,
  );

  const dataInt16 = new Int16Array(data.buffer);
  const l = dataInt16.length;
  const dataFloat32 = new Float32Array(l);
  for (let i = 0; i < l; i++) {
    dataFloat32[i] = dataInt16[i] / 32768.0;
  }
  // Extract interleaved channels
  if (numChannels === 0) {
    buffer.copyToChannel(dataFloat32, 0);
  } else {
    for (let i = 0; i < numChannels; i++) {
      const channel = dataFloat32.filter(
        (_, index) => index % numChannels === i,
      );
      buffer.copyToChannel(channel, i);
    }
  }

  return buffer;
}

function pcmToWav(pcmData: Uint8Array, sampleRate: number, numChannels: number = 1): Uint8Array {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  const totalDataLen = pcmData.length;
  const fileSize = totalDataLen + 36;

  // RIFF chunk descriptor
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, fileSize, true);
  view.setUint32(8, 0x57415645, false); // "WAVE"

  // fmt sub-chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * numChannels * 2, true); // ByteRate
  view.setUint16(32, numChannels * 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample

  // data sub-chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, totalDataLen, true);

  const wavBuffer = new Uint8Array(header.byteLength + pcmData.byteLength);
  wavBuffer.set(new Uint8Array(header), 0);
  wavBuffer.set(pcmData, header.byteLength);

  return wavBuffer;
}

function float32ToWav(channelData: Float32Array, sampleRate: number): Blob {
  const totalDataLen = channelData.length * 2; // 16-bit = 2 bytes per sample
  const buffer = new ArrayBuffer(44 + totalDataLen);
  const view = new DataView(buffer);
  
  /* RIFF identifier */
  view.setUint32(0, 0x52494646, false); // "RIFF"
  /* file length */
  view.setUint32(4, 36 + totalDataLen, true);
  /* RIFF type */
  view.setUint32(8, 0x57415645, false); // "WAVE"
  
  /* format chunk identifier */
  view.setUint32(12, 0x666d7420, false); // "fmt "
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw PCM = 1) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, 1, true); // 1 channel
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  
  /* data chunk identifier */
  view.setUint32(36, 0x64617461, false); // "data"
  /* chunk length */
  view.setUint32(40, totalDataLen, true);
  
  // Write the PCM audio samples
  const l = channelData.length;
  let offset = 44;
  for (let i = 0; i < l; i++) {
    // Clamp sample between -1 and 1
    let sample = Math.max(-1, Math.min(1, channelData[i]));
    // Convert to 16-bit signed integer
    const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    view.setInt16(offset, intSample, true);
    offset += 2;
  }
  
  return new Blob([buffer], { type: 'audio/wav' });
}

export async function mergeWavBlobs(blobs: Blob[]): Promise<Blob> {
  const targetSampleRate = 24000;
  const audioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!audioContextClass) {
    throw new Error('Web Audio API is not supported in this browser.');
  }
  
  const decodedBuffers: Float32Array[] = [];
  
  for (let idx = 0; idx < blobs.length; idx++) {
    const blob = blobs[idx];
    const arrayBuffer = await blob.arrayBuffer();
    
    // Create a temporary AudioContext to decode the source blob
    const tempCtx = new audioContextClass();
    let audioBuffer: AudioBuffer;
    try {
      audioBuffer = await tempCtx.decodeAudioData(arrayBuffer);
    } catch (err) {
      console.error(`Error decoding audio blob #${idx}:`, err);
      throw new Error(`تعذر فك تشفير الملف الصوتي للدرس #${idx + 1}. تأكد من سلامة وصلاحية ملف الصوت لهذا الدرس.`);
    } finally {
      await tempCtx.close();
    }
    
    // Use OfflineAudioContext to resample it to a standard 24000 Hz monophonic canvas
    const duration = audioBuffer.duration;
    const length = Math.ceil(duration * targetSampleRate);
    const offlineCtx = new OfflineAudioContext(1, length, targetSampleRate);
    
    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineCtx.destination);
    source.start();
    
    const resampledBuffer = await offlineCtx.startRendering();
    const monoData = resampledBuffer.getChannelData(0);
    decodedBuffers.push(monoData);
  }
  
  // Concatenate all resampled float channels
  let totalLength = 0;
  for (const buf of decodedBuffers) {
    totalLength += buf.length;
  }
  
  const mergedFloatData = new Float32Array(totalLength);
  let offset = 0;
  for (const buf of decodedBuffers) {
    mergedFloatData.set(buf, offset);
    offset += buf.length;
  }
  
  // Convert Float32Array to robust standard 16-bit PCM WAV
  return float32ToWav(mergedFloatData, targetSampleRate);
}

export function splitTextIntoSafeChunks(text: string, maxChunkLen: number = 600): string[] {
  // First split by paragraphs
  const paragraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);
  const chunks: string[] = [];
  
  for (const paragraph of paragraphs) {
    if (paragraph.length <= maxChunkLen) {
      chunks.push(paragraph);
    } else {
      // Split into sentences
      // Match sentence endings like '.', '!', '?' preserving character limit
      const sentences = paragraph.split(/(?<=[.!?])\s+/);
      let currentChunk = '';
      for (const sentence of sentences) {
        if ((currentChunk + ' ' + sentence).trim().length <= maxChunkLen) {
          currentChunk = (currentChunk + ' ' + sentence).trim();
        } else {
          if (currentChunk) {
            chunks.push(currentChunk);
          }
          currentChunk = sentence;
        }
      }
      if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
      }
    }
  }
  return chunks;
}

export async function generateTTSWithChunking(
  text: string,
  apiKey: string,
  voiceName: string = 'Kore'
): Promise<Blob> {
  const chunks = splitTextIntoSafeChunks(text);
  const blobs: Blob[] = [];

  const customKeyRaw = typeof window !== 'undefined' ? localStorage.getItem('lingo_custom_api_key') : null;
  const customKey = (customKeyRaw && customKeyRaw.trim() !== '' && customKeyRaw !== 'undefined' && customKeyRaw !== 'null') ? customKeyRaw.trim().replace(/^["']|["']$/g, '') : null;

  for (const chunk of chunks) {
    let base64Audio = '';
    let usedDirectClientAPI = false;

    // Try to use backend API first, but fallback to direct Gemini API if it fails
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (customKey) {
        headers['x-gemini-api-key'] = customKey;
      }

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers,
        body: JSON.stringify({ text: chunk, voiceName })
      });

      if (response.ok) {
        const responseData = await response.json();
        base64Audio = responseData.base64Audio;
      } else {
        console.warn('Backend TTS API returned error, attempting direct Gemini API...');
        if (customKey) {
          usedDirectClientAPI = true;
        } else {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'فشل الاتصال بخدمة توليد الصوت.');
        }
      }
    } catch (backendErr) {
      console.warn('Backend TTS connection failed, attempting direct Gemini API:', backendErr);
      if (customKey) {
        usedDirectClientAPI = true;
      } else {
        throw new Error('فشل الاتصال بخدمة توليد الصوت. يرجى إدخال مفتاح API الخاص بك في الإعدادات المتقدمة.');
      }
    }

    if (usedDirectClientAPI && customKey) {
      // Direct call from user's browser to Gemini API for TTS response!
      // Using only the latest 3.1 Flash model for TTS as requested
      const ttsModels = ['gemini-3.1-flash-tts-preview'];
      let lastDirectErr: any = null;
      let successDirect = false;

      for (const model of ttsModels) {
        try {
          console.log(`[Direct Gemini TTS] Requesting model: ${model} with voice: ${voiceName}`);
          const restUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${customKey}`;
          
          // Google Gemini REST API requires snake_case for many parameters in direct fetch calls
          const restResponse = await fetch(restUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: chunk }] }],
              generationConfig: {
                response_modalities: ['AUDIO'],
                speech_config: {
                  voice_config: {
                    prebuilt_voice_config: {
                      voice_name: voiceName || 'Kore'
                    }
                  }
                }
              }
            })
          });

          if (!restResponse.ok) {
            const errBody = await restResponse.json().catch(() => ({}));
            throw new Error(errBody?.error?.message || `HTTP status ${restResponse.status}`);
          }

          const restData = await restResponse.json();
          const pcmDataBase64 = restData.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          
          if (pcmDataBase64) {
            base64Audio = pcmDataBase64;
            successDirect = true;
            console.log(`[Direct Gemini TTS] Success with model: ${model}`);
            break;
          }
        } catch (modelErr) {
          console.warn(`[Direct Gemini TTS] Model ${model} failed to generate TTS:`, modelErr);
          lastDirectErr = modelErr;
        }
      }

      if (!successDirect) {
        throw lastDirectErr || new Error('فشلت جميع محاولات توليد الصوت مباشرة عبر Gemini. تأكد من صحة مفتاح الـ API الخاص بك.');
      }
    }

    if (base64Audio) {
      const bytes = decode(base64Audio);
      const wavBytes = pcmToWav(bytes, 24000, 1);
      blobs.push(new Blob([wavBytes], { type: 'audio/wav' }));
    } else {
      throw new Error('لم يتم إرجاع مقطع صوتي للجزء الحالي من النص.');
    }
  }

  if (blobs.length === 0) {
    throw new Error('فشل توليد أي مقطع صوتي.');
  }

  if (blobs.length === 1) {
    return blobs[0];
  }

  return mergeWavBlobs(blobs);
}

export {createBlob, decode, decodeAudioData, encode, pcmToWav};
