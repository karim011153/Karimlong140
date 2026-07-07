import { LitElement, html, svg } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type { Lesson } from '../utils/types';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

@customElement('chat-sidebar')
export class ChatSidebar extends LitElement {
  @property({ type: Array })
  lessons: Lesson[] = [];

  @property({ type: Boolean })
  isOpen = false;

  @state()
  private messages: Message[] = [];

  @state()
  private inputValue = '';

  @state()
  private isGenerating = false;

  @state()
  private errorMessage = '';

  @query('#chat-messages-container')
  private messagesContainer!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.loadHistory();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('isOpen') && this.isOpen) {
      this.scrollToBottom();
      // Auto-focus input if open
      setTimeout(() => {
        const input = this.querySelector('#chat-input') as HTMLTextAreaElement;
        if (input) input.focus();
      }, 300);
    }
  }

  private loadHistory() {
    try {
      const stored = localStorage.getItem('lingo_gemini_chat_history');
      if (stored) {
        this.messages = JSON.parse(stored);
      } else {
        // First-run welcome message from Gemini (as prompt seed)
        this.messages = [
          {
            role: 'model',
            text: 'أهلاً بك في **مساعدك وتوأمك الدراسي الذكي**! ✨\n\nأنا هنا لمساعدتك في التخطيط لدراستك، شرح دروس الإنجليزية، اقتراح خطط حفظ ومراجعة الكلمات، وتطوير نطقك وقراءتك. أي من دروس التطبيق أو القواعد تود أن نناقشه أو تخطط له الآن؟ 🚀',
            timestamp: Date.now()
          }
        ];
        this.saveHistory();
      }
    } catch (e) {
      console.error('Error loading chat history:', e);
    }
  }

  private saveHistory() {
    try {
      localStorage.setItem('lingo_gemini_chat_history', JSON.stringify(this.messages));
    } catch (e) {
      console.error('Error saving chat history:', e);
    }
  }

  private clearHistory() {
    if (confirm('هل أنت متأكد من رغبتك في مسح سجل المحادثة بالكامل؟')) {
      this.messages = [
        {
          role: 'model',
          text: 'تم مسح السجل الدراسي بنجاح. أهلاً بك مجدداً! كيف تود بدء خطتنا أو مذاكرتنا لليوم؟',
          timestamp: Date.now()
        }
      ];
      this.saveHistory();
      this.errorMessage = '';
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      }
    }, 50);
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.inputValue = target.value;
  }

  private async sendMessage() {
    const textToSend = this.inputValue.trim();
    if (!textToSend || this.isGenerating) return;

    this.errorMessage = '';
    this.inputValue = '';
    
    // Add user message to history
    const userMessage: Message = {
      role: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    this.messages = [...this.messages, userMessage];
    this.saveHistory();
    this.scrollToBottom();

    this.isGenerating = true;

    try {
      // Generate the study/lessons context
      const lessonsSummary = this.lessons && this.lessons.length > 0
        ? `الدروس المتوفرة حالياً في التطبيق للمستخدم للمذاكرة والمتابعة والخطط:\n` + 
          this.lessons.map((l, idx) => `- الدرس #${idx + 1}: [${l.title}] يحتوي على: "${l.text ? l.text.slice(0, 100) + '...' : ''}"`).join('\n')
        : 'لا توجد دروس مخصصة كافية مضافة في الحساب حالياً.';

      const systemPrompt = `أنت معلم لغة إنجليزية ذكي وخبير ومساعد دراسي وودود جداً تُدعى "الهدف المساعد الدراسي الذكي (Gemini)".
مهمتك الأساسية هي:
1- مساعدة المستخدم بذكاء وطلاقة بالغة في تصميم وإعطاء خطط دراسية، تذكر تقدمه الدراسي، ومناقشة تفاصيل مذاكرته بناء على السجل والمحادثات السابقة المخزنة محلياً.
2- شرح وتفسير الدروس، تقديم أمثلة حية، اختبار المستخدم بالكلمات والقواعد، وتحسين مهاراته في الاستماع والقراءة.
3- عندما يسألك عن تفاصيل مذاكرته أو خططه السابقة، اعتمد كلياً على سجل المحادثات المرفق ومحتوياته لتذكره بها فوراً وطمأنته أنك تتذكر كل شيء.

الدروس المتاحة حالياً للمقارنة والمذاكرة:
${lessonsSummary}

نصائح عامة للتفاعل:
- أجب باللغة العربية لشرح المفاهيم بوضوح تام وتيسير الفهم، مع وضع الكلمات والتعابير الإنجليزية بخط واضح ومترجم.
- حافظ على النبرة الإيجابية، المحفزة والمشجعة دائماً ومساعدة الطلاب على التعلم الفعال والممتع.`;

      // Convert current chat history into the format required by the Gemini API
      // To prevent token layout overflow, we can provide a sliding window of the last 20 messages
      const maxWindow = 20;
      const messageWindow = this.messages.slice(-maxWindow);
      let apiContents = messageWindow.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      // In Gemini API, multi-turn history (contents) MUST start with "user" role.
      // If our welcome message or initial state starts with "model", we trim those leading messages.
      while (apiContents.length > 0 && apiContents[0].role !== 'user') {
        apiContents.shift();
      }

      // If for some reason we end up empty, we build a fallback containing only the last user message
      if (apiContents.length === 0 && textToSend) {
        apiContents = [{
          role: 'user',
          parts: [{ text: textToSend }]
        }];
      }

      // Strictly alternate roles to guarantee Gemini API specifications constraints
      const optimizedContents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
      for (const current of apiContents) {
        if (optimizedContents.length === 0) {
          if (current.role === 'user') {
            optimizedContents.push(current);
          }
        } else {
          const lastAdded = optimizedContents[optimizedContents.length - 1];
          if (lastAdded.role === current.role) {
            // Merge duplicate roles to keep conversation context intact without violating alternation rules
            lastAdded.parts[0].text += '\n\n' + current.parts[0].text;
          } else {
            optimizedContents.push(current);
          }
        }
      }

      const customKeyRaw = localStorage.getItem('lingo_custom_api_key');
      const customKey = (customKeyRaw && customKeyRaw.trim() !== '' && customKeyRaw !== 'undefined' && customKeyRaw !== 'null') ? customKeyRaw.trim().replace(/^["']|["']$/g, '') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (customKey) {
        headers['x-gemini-api-key'] = customKey;
      }

      let response: Response | null = null;
      let replyText = '';
      let usedDirectClientAPI = false;

      // Try to use backend API first, but fallback to direct Gemini API if it fails
      // This makes the app work on any hosting platform (static or dynamic)
      try {
        response = await fetch('/api/gemini', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            contents: optimizedContents,
            systemInstruction: systemPrompt,
            temperature: 0.7
          })
        });
        
        // If response is not OK, try direct API if we have a custom key
        if (!response.ok && customKey) {
          console.warn('Backend API returned error, attempting direct Gemini API...');
          usedDirectClientAPI = true;
          response = null;
        }
      } catch (fetchErr) {
        console.warn('Backend API connection failed, attempting direct Gemini API:', fetchErr);
        // If backend fails and we have a custom key, use direct API
        if (customKey) {
          usedDirectClientAPI = true;
        } else {
          // If no custom key and backend failed, throw error
          throw new Error('فشل الاتصال بالخادم. يرجى إدخال مفتاح API الخاص بك في الإعدادات المتقدمة لتفعيل الاتصال المباشر.');
        }
      }

      if (usedDirectClientAPI && customKey) {
        // Direct call to Gemini REST API from user's browser using their custom keys!
        // We'll try candidates: gemini-2.5-flash first, then gemini-2.0-flash, then gemini-1.5-flash
        const chatModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
        let lastDirectError: any = null;
        let successDirect = false;

        for (const model of chatModels) {
          try {
            console.log(`[Direct Gemini Chat] Requesting model: ${model}`);
            const restUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${customKey}`;
            const restResponse = await fetch(restUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: optimizedContents,
                systemInstruction: {
                  parts: [{ text: systemPrompt }]
                },
                generationConfig: {
                  temperature: 0.7
                }
              })
            });

            if (!restResponse.ok) {
              const errBody = await restResponse.json().catch(() => ({}));
              throw new Error(errBody?.error?.message || `HTTP status ${restResponse.status}`);
            }

            const restData = await restResponse.json();
            const textResponse = restData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
              replyText = textResponse;
              successDirect = true;
              console.log(`[Direct Gemini Chat] Success with model: ${model}`);
              break;
            }
          } catch (modelErr) {
            console.warn(`[Direct Gemini Chat] Model ${model} failed:`, modelErr);
            lastDirectError = modelErr;
          }
        }

        if (!successDirect) {
          throw lastDirectError || new Error('فشلت جميع محاولات الاتصال المباشر بذكاء Gemini مع مفتاح الـ API الخاص بك.');
        }

      } else if (response) {
        // Handle regular server proxy response
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'فشل الاتصال بخدمة المساعد الدراسي الذكي.');
        }

        const responseData = await response.json();
        replyText = responseData.text || 'عذراً، لم أتمكن من صياغة إجابة مناسبة حالياً.';
      } else {
        throw new Error('لم يتم الحصول على استجابة من الخادم أو الـ API المباشر.');
      }

      const modelMessage: Message = {
        role: 'model',
        text: replyText,
        timestamp: Date.now()
      };

      this.messages = [...this.messages, modelMessage];
      this.saveHistory();
    } catch (e: any) {
      console.error('Gemini Chat error:', e);
      this.errorMessage = e?.message || 'واجهت مشكلة غير متوقعة أثناء الاتصال بـ Gemini.';
      // Keep user message but show error helper
    } finally {
      this.isGenerating = false;
      this.scrollToBottom();
    }
  }

  private handleChipClick(promptText: string) {
    const input = this.querySelector('#chat-input') as HTMLTextAreaElement;
    if (input) {
      this.inputValue = promptText;
      input.value = promptText;
      input.focus();
    }
  }

  private formatText(text: string) {
    if (!text) return '';
    
    // Prevent XSS
    let htmlContent = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Support bold: **text** => <strong>text</strong>
    htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Support italic: *text* => <em>text</em>
    htmlContent = htmlContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Support list bullet points
    htmlContent = htmlContent.split('\n').map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return `<li style="margin-right: 1.5rem; margin-bottom: 0.25rem; text-align: right; direction: rtl; list-style-type: disc;">${trimmed.substring(2)}</li>`;
      }
      return line;
    }).join('\n');
    
    // Support code blocks: ```code```
    htmlContent = htmlContent.replace(/```([\s\S]*?)```/g, '<pre style="background: rgba(0,0,0,0.5); padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.85rem; overflow-x: auto; direction: ltr; text-align: left; border: 1px solid rgba(255,255,255,0.06); margin: 0.75rem 0;"><code>$1</code></pre>');
    
    // Support inline code \`code\`
    htmlContent = htmlContent.replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.12); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; direction: ltr;">$1</code>');

    // Newlines
    return htmlContent.replace(/\n/g, '<br>');
  }

  render() {
    const closeIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>`;
    const sendIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
    const trashIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;

    return html`
      <style>
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          height: 100dvh;
          width: 380px;
          max-width: 100%;
          background: rgba(11, 14, 30, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.6);
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
          display: flex;
          flex-direction: column;
          z-index: 100;
          box-sizing: border-box;
          opacity: 0;
          pointer-events: none;
        }

        .sidebar.open {
          transform: translateX(0);
          opacity: 1;
          pointer-events: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(5, 7, 17, 0.4);
          flex-shrink: 0;
        }

        .sidebar-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          direction: rtl;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .action-button {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transform: scale(1.05);
        }

        .action-button.delete:hover {
          background: rgba(244, 63, 94, 0.15);
          border-color: rgba(244, 63, 94, 0.3);
          color: #f43f5e;
        }

        .messages-area {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
        }

        .messages-area::-webkit-scrollbar {
          width: 5px;
        }

        .messages-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
        }

        .msg-bubble-wrapper {
          display: flex;
          flex-direction: column;
          max-width: 85%;
        }

        .msg-bubble-wrapper.user {
          align-self: flex-start;
          text-align: left;
        }

        .msg-bubble-wrapper.model {
          align-self: flex-end;
          text-align: right;
        }

        .msg-bubble {
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.95rem;
          line-height: 1.6;
          word-break: break-word;
          white-space: pre-wrap;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .msg-bubble-wrapper.user .msg-bubble {
          background: linear-gradient(135deg, #3b82f6 0%, #d946ef 100%);
          color: white;
          border-bottom-left-radius: 4px;
        }

        .msg-bubble-wrapper.model .msg-bubble {
          background: rgba(255, 255, 255, 0.03);
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom-right-radius: 4px;
        }

        .msg-meta {
          font-size: 0.7rem;
          color: #64748b;
          margin-top: 0.25rem;
          padding: 0 0.35rem;
        }

        .msg-bubble-wrapper.user .msg-meta {
          text-align: left;
        }

        .msg-bubble-wrapper.model .msg-meta {
          text-align: right;
          direction: rtl;
        }

        .suggestion-box {
          padding: 0.65rem 1rem;
          background: rgba(0, 0, 0, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          overflow-x: auto;
          display: flex;
          gap: 0.5rem;
          scrollbar-width: none;
          max-height: 48px;
          flex-shrink: 0;
        }

        .suggestion-box::-webkit-scrollbar {
          display: none;
        }

        .suggestion-chip {
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          direction: rtl;
        }

        .suggestion-chip:hover {
          background: rgba(217, 70, 239, 0.08);
          border-color: rgba(217, 70, 239, 0.3);
          color: #f472b6;
          transform: translateY(-1px);
        }

        .input-area {
          padding: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(5, 7, 17, 0.6);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .input-row {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .chat-textarea {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 0.55rem 0.75rem;
          color: white;
          font-family: inherit;
          font-size: 0.95rem;
          resize: none;
          outline: none;
          height: 38px;
          min-height: 38px;
          max-height: 120px;
          line-height: 1.4;
          box-sizing: border-box;
          transition: border-color 0.2s;
          text-align: right;
          direction: rtl;
        }

        .chat-textarea:focus {
          border-color: var(--primary-color);
          background: rgba(255, 255, 255, 0.05);
        }

        .send-button {
          background: var(--primary-color);
          border: none;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
        }

        .send-button:hover {
          background: var(--primary-hover-color);
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(217, 70, 239, 0.4);
        }

        .send-button:disabled {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.15);
          cursor: not-allowed;
          box-shadow: none;
        }

        .thinking-indicator {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.35rem;
          color: var(--text-color-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0 0.5rem;
          direction: rtl;
        }

        .thinking-dots {
          display: flex;
          gap: 3px;
        }

        .thinking-dot {
          width: 5px;
          height: 5px;
          background-color: var(--primary-color);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .thinking-dot:nth-child(1) { animation-delay: -0.32s; }
        .thinking-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .error-banner {
          background: rgba(244, 63, 94, 0.08);
          border: 1px dashed rgba(244, 63, 94, 0.25);
          color: #f43f5e;
          font-size: 0.8rem;
          padding: 0.5rem;
          border-radius: 6px;
          text-align: right;
          direction: rtl;
          margin-top: 0.25rem;
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 100%;
          }
        }
      </style>

      <div class="sidebar ${this.isOpen ? 'open' : ''}">
        <div class="sidebar-header">
          <button class="action-button close" @click=${() => this.dispatchEvent(new CustomEvent('close-chat'))} title="إغلاق اللوحة">
            ${closeIcon}
          </button>
          
          <div class="header-actions">
            <button class="action-button delete" @click=${this.clearHistory} title="مسح المحادثة بالكامل">
              ${trashIcon}
            </button>
            <h3 class="sidebar-title">
              <span>مساعد الدراسة (Gemini)</span>
              <span>✨</span>
            </h3>
          </div>
        </div>

        <div class="messages-area" id="chat-messages-container">
          ${this.messages.map(msg => html`
            <div class="msg-bubble-wrapper ${msg.role}">
              <div class="msg-bubble" .innerHTML=${this.formatText(msg.text)}></div>
              <div class="msg-meta">
                ${msg.role === 'model' ? 'مساعد Gemini' : 'أنت'} • ${new Date(msg.timestamp).toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' })}
              </div>
            </div>
          `)}

          ${this.isGenerating ? html`
            <div class="msg-bubble-wrapper model">
              <div class="msg-bubble" style="background: rgba(255,255,255,0.02)">
                <div class="thinking-indicator">
                  <span>جاري الكتابة والتذكر</span>
                  <div class="thinking-dots">
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                    <span class="thinking-dot"></span>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          ${this.errorMessage ? html`
            <div class="error-banner">
              ⚠️ ${this.errorMessage}
            </div>
          ` : ''}
        </div>

        <!-- Quick study actions chips -->
        <div class="suggestion-box">
          <div class="suggestion-chip" @click=${() => this.handleChipClick('ضع لي خطة لمذاكرة وحفظ كلمات الدروس المتاحة')}>📅 خطة حفظ الكلمات</div>
          <div class="suggestion-chip" @click=${() => this.handleChipClick('اشرح لي الكلمات والتعبيرات الهامة في أفضل درس متاح')}>💡 شرح عبارات هامة</div>
          <div class="suggestion-chip" @click=${() => this.handleChipClick('اكتب لي قصة قصيرة بالإنجليزية مع ترجمتها لتحدي القراءة الجديد')}>📖 تحدي قراءة وقصة</div>
          <div class="suggestion-chip" @click=${() => this.handleChipClick('اختبرني بخمسة أسئلة اختيار من متعدد لقواعد اللغة')}>🎯 اختبار قواعد فوري</div>
        </div>

        <div class="input-area">
          <div class="input-row">
            <button class="send-button" ?disabled=${!this.inputValue.trim() || this.isGenerating} @click=${this.sendMessage} title="إرسال">
              ${sendIcon}
            </button>
            <textarea
              id="chat-input"
              class="chat-textarea"
              placeholder="اكتب رسالتك للمذاكرة أو التخطيط..."
              .value=${this.inputValue}
              @input=${this.handleInput}
              @keydown=${this.handleKeyDown}
            ></textarea>
          </div>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-sidebar': ChatSidebar;
  }
}
