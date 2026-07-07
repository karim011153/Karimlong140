/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { Lesson, Word } from '../utils/types';
import { pcmToWav, generateTTSWithChunking } from '../utils/audio';

@customElement('add-lesson-view')
export class AddLessonView extends LitElement {
  @property({ type: Object })
  lesson: Lesson | null = null;

  @state()
  private isGenerating = false;

  @state()
  private hasApiKey = false;

  @state()
  private generationProgress = 0;

  @state()
  private generationTimeRemaining = 5;

  private progressInterval: any = null;

  @state()
  private generatedAudioUrl: string | null = null;

  @state()
  private generatedBase64: string | null = null;

  @state()
  private likedAudioBlob: Blob | null = null;

  private lastGeneratedBlob: Blob | null = null;

  private startProgressCountdown() {
    this.generationProgress = 0;
    this.generationTimeRemaining = 5;
    
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    const startTime = Date.now();
    const duration = 5000; // Expected 5s duration for the audio generation

    this.progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let progress = (elapsed / duration) * 100;
      
      if (progress >= 98) {
        progress = 98; // Hold at 98% until the task completes
      }
      
      this.generationProgress = Math.round(progress);
      this.generationTimeRemaining = Math.max(1, Math.ceil((duration - elapsed) / 1000));
    }, 100);
  }

  private stopProgressCountdown(success: boolean) {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    if (success) {
      this.generationProgress = 100;
      this.generationTimeRemaining = 0;
    } else {
      this.generationProgress = 0;
      this.generationTimeRemaining = 0;
    }
  }

  @query('form')
  private form!: HTMLFormElement;

  @query('#content-input')
  private contentInput!: HTMLTextAreaElement;

  @query('#translation-input')
  private translationInput!: HTMLTextAreaElement;

  @query('#audio-input')
  private audioInput!: HTMLInputElement;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('lesson')) {
      this.cleanupGeneratedAudio();
      this.lastGeneratedBlob = null;
      if (this.lesson) {
        this.contentInput.value = this.lesson.content
          .map((w) => w.text)
          .join('');
        this.translationInput.value = this.lesson.translation || '';
        this.audioInput.required = false;
      } else {
        this.form.reset();
        this.audioInput.required = true;
      }
    }
    super.updated(changedProperties);
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        this.hasApiKey = !!data.hasApiKey;
      }
    } catch {
      this.hasApiKey = false;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupGeneratedAudio();
  }

  private cleanupGeneratedAudio() {
    if (this.generatedAudioUrl) {
      URL.revokeObjectURL(this.generatedAudioUrl);
      this.generatedAudioUrl = null;
    }
    this.generatedBase64 = null;
    this.likedAudioBlob = null;
  }

  private async handleGenerateTTS() {
    const text = this.contentInput.value.trim();
    if (!text) {
      alert('الرجاء كتابة نص باللغة الإنجليزية أولاً لتوليد الصوت.');
      return;
    }

    this.isGenerating = true;
    this.startProgressCountdown();
    try {
      const blob = await generateTTSWithChunking(text, '', 'Kore');

      this.cleanupGeneratedAudio();
      this.generatedAudioUrl = URL.createObjectURL(blob);
      this.lastGeneratedBlob = blob;

      // Convert blob to DataURL (base64) so it's fully embedded in the HTML lesson state
      const reader = new FileReader();
      reader.onloadend = () => {
        this.generatedBase64 = reader.result as string;
        this.stopProgressCountdown(true);
      };
      reader.readAsDataURL(blob);
    } catch (error: any) {
      console.error('Error generating audio:', error);
      this.stopProgressCountdown(false);
      alert(`فشل في توليد الصوت. السبب: ${error?.message || error}`);
    } finally {
      this.isGenerating = false;
    }
  }

  private handleLikeAudio() {
    if (this.lastGeneratedBlob) {
      this.likedAudioBlob = this.lastGeneratedBlob;
      this.audioInput.required = false;
    }
  }

  private handleDiscardTTS() {
    this.cleanupGeneratedAudio();
    this.lastGeneratedBlob = null;
    this.audioInput.required = !this.lesson;
  }

  private handleCopyHTMLEmbed() {
    const textArea = this.querySelector('#html-code-area') as HTMLTextAreaElement;
    if (navigator.clipboard && textArea) {
      navigator.clipboard.writeText(textArea.value)
        .then(() => alert('تم نسخ كود الـ HTML بنجاح!'))
        .catch(() => alert('فشل النسخ تلقائياً. يرجى نسخ الكود يدوياً من الشاشة.'));
    } else if (textArea) {
      textArea.select();
      document.execCommand('copy');
      alert('تم نسخ كود الـ HTML بنجاح!');
    }
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    const textContent = this.contentInput.value;
    const translation = this.translationInput.value;
    let audioFile = this.audioInput.files?.[0];

    // If no manual audio was uploaded, but the user liked the generated AI audio, use it!
    if (!audioFile && this.likedAudioBlob) {
      audioFile = new File([this.likedAudioBlob], 'lesson-ai-audio.wav', { type: 'audio/wav' });
    }

    // In edit mode, audio file is optional, but for new lessons it's required unless we have the liked audio / base64
    if (!audioFile && !this.likedAudioBlob && !this.lesson) {
      alert('الرجاء رفع ملف صوتي للدرس أو توليد المقطع بالذكاء الاصطناعي والموافقة عليه.');
      return;
    }

    // Split text into words and spaces, preserving whitespace.
    const content: Word[] = [];
    const tokens = textContent.split(/(\s+)/);
    for (const token of tokens) {
      if (token) {
        // For user-added lessons, we don't have timing info.
        content.push({ text: token, start: -1, end: -1 });
      }
    }

    const lessonData: {
      id?: number;
      content: Word[];
      text: string;
      translation: string;
      audioFile?: File;
      audioSrc?: string;
    } = {
      content,
      text: textContent,
      translation,
    };

    if (this.lesson) {
      lessonData.id = this.lesson.id;
    }
    if (audioFile) {
      lessonData.audioFile = audioFile;
    }
    if (this.likedAudioBlob && this.generatedBase64) {
      lessonData.audioSrc = 'db';
    }

    (this as unknown as HTMLElement).dispatchEvent(
      new CustomEvent('lesson-saved', {
        detail: lessonData,
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleCancel() {
    (this as unknown as HTMLElement).dispatchEvent(
      new CustomEvent('cancel-add', { bubbles: true, composed: true })
    );
  }

  private handleDelete() {
    if (!this.lesson) return;
    if (confirm('Are you sure you want to permanently delete this lesson?')) {
      (this as unknown as HTMLElement).dispatchEvent(
        new CustomEvent('lesson-deleted', {
          detail: this.lesson.id,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    const isEditing = this.lesson !== null;
    return html`
      <div class="add-lesson-container" style="max-width: 800px; margin: 2rem auto; padding: 2.5rem; background: var(--card-bg, rgba(30, 41, 59, 0.45)); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; backdrop-filter: blur(20px); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35); color: #ffffff;" dir="rtl">
        
        <header style="border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 1.5rem; margin-bottom: 2rem;">
          <h2 style="margin: 0; font-size: 1.6rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, var(--primary-color, #a855f7)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: right; display: flex; align-items: center; gap: 0.6rem;">
            <span>${isEditing ? '✏️ تعديل الدرس وتحديث المحتوى' : '✍️ إضافة درس تعليمي جديد'}</span>
          </h2>
          <p style="margin: 0.5rem 0 0 0; color: var(--text-color-secondary, #94a3b8); font-size: 0.9rem; text-align: right;">
            ${isEditing ? 'قم بتحديث النصوص والترجمة لكي تظهر فوراً للمتعلم مع فرصة إعادة توليد المقطع الصوتي.' : 'قم بكتابة نص الدرس باللغة الإنجليزية، المقابل العربي، وثم توليد مقطع الصوت الذكي لتجهيز الدرس.'}
          </p>
        </header>

        <form @submit=${this.handleSubmit} novalidate style="display: flex; flex-direction: column; gap: 1.75rem;">
          
          <!-- English Input Column (should remain LTR styled) -->
          <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem; text-align: right;">
            <label for="content-input" style="font-weight: 700; font-size: 0.95rem; color: #ffffff; display: flex; align-items: center; gap: 0.4rem; justify-content: flex-start;">
              <span>📝 نص الدرس (باللغة الإنجليزية)</span>
              <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 1px 6px; border-radius: 4px;">مطلوب *</span>
            </label>
            <textarea 
              id="content-input" 
              required 
              placeholder="e.g. Hello, welcome to your English practice lesson. Let's start with daily greetings."
              style="width: 100%; min-height: 120px; padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; font-size: 1rem; line-height: 1.6; direction: ltr; text-align: left; transition: all 0.2s;"
            ></textarea>
          </div>

          <!-- Arabic Input Column -->
          <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem; text-align: right;">
            <label for="translation-input" style="font-weight: 700; font-size: 0.95rem; color: #ffffff; display: flex; align-items: center; gap: 0.4rem; justify-content: flex-start;">
              <span>🌐 ترجمة الدرس المرافقة (باللغة العربية)</span>
              <span style="font-size: 0.75rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #94a3b8; padding: 1px 6px; border-radius: 4px;">اختياري</span>
            </label>
            <textarea 
              id="translation-input" 
              placeholder="مثال: مرحباً بك في درس التمرن على الإنجليزية. دعنا نبدأ بالتحيات اليومية والترحيب الحار."
              style="width: 100%; min-height: 100px; padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: #ffffff; font-size: 1rem; line-height: 1.6; direction: rtl; text-align: right; transition: all 0.2s;"
            ></textarea>
          </div>

          <!-- HTML Audio TTS Section -->
          <div class="form-group tts-generation-group" style="border: 1.5px dashed rgba(168, 85, 247, 0.3); padding: 1.75rem; border-radius: 16px; background-color: rgba(168, 85, 247, 0.03); margin-bottom: 0.5rem; text-align: right;">
            <label style="display: flex; align-items: center; gap: 0.6rem; color: #c084fc; margin-bottom: 0.5rem; font-weight: 700; font-size: 1rem; justify-content: flex-start;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
              توليد المقطع الصوتي للدرس تلقائياً بالذكاء الاصطناعي (AI Voice Generator)
            </label>
            <p style="font-size: 0.85rem; color: var(--text-color-secondary, #94a3b8); margin-top: 0; margin-bottom: 1.25rem; line-height: 1.6;">
              يمكنك تحويل النص الإنجليزي أعلاه إلى نطق بشري فائق الجودة بصوت احترافي عبر جيمني بلمسة زر واحدة للاستماع والتعلم التفاعلي.
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
              <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                <button 
                  type="button" 
                  class="generate-audio-btn" 
                  @click=${this.handleGenerateTTS} 
                  ?disabled=${this.isGenerating}
                  style="border: 1.5px solid var(--primary-color, #a855f7); color: #ffffff; display: flex; align-items: center; gap: 0.5rem; padding: 0.7rem 1.4rem; border-radius: 10px; cursor: pointer; background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(217, 70, 239, 0.15)); font-weight: 700; font-size: 0.88rem; transition: all 0.2s;"
                >
                  ${this.isGenerating ? html`
                    <svg style="animation: spin 1s linear infinite; width: 16px; height: 16px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%; margin-left: 0.4rem;" viewBox="0 0 24 24"></svg>
                    جاري التوليد...
                  ` : html`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-left: 0.4rem;">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                    تحويل النص لصوت (Gemini Voice) 🎙️
                  `}
                </button>
                
                <!-- API Key Status Indicator -->
                <span style="font-size: 0.82rem; color: ${this.hasApiKey ? '#34d399' : '#f87171'}; font-weight: 600; display: flex; align-items: center; gap: 0.3rem;">
                  <span style="font-size: 1.1rem; vertical-align: middle;">●</span> 
                  ${this.hasApiKey ? 'كود الـ API متوفر وجاهز للتوليد' : 'سيتم استخدام مفتاح الاستضافة الافتراضي'}
                </span>
              </div>

              <!-- Animate loading and time progress bar -->
              ${this.isGenerating ? html`
                <div style="padding: 1.25rem; border-radius: 12px; background-color: rgba(0, 0, 0, 0.35); border: 1px solid rgba(168, 85, 247, 0.3); display: flex; flex-direction: column; gap: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                    <span style="font-weight: 700; color: #c084fc; display: flex; align-items: center; gap: 0.5rem;">
                      <svg style="animation: spin 1s linear infinite; width: 14px; height: 14px; border: 2px solid currentColor; border-top-color: transparent; border-radius: 50%;" viewBox="0 0 24 24"></svg>
                      معالجة طلب جيمني وتوليد النبرة الصوتية...
                    </span>
                    <span style="font-weight: bold; color: #c084fc; font-family: monospace;">
                      ${this.generationProgress}%
                    </span>
                  </div>
                  
                  <div style="width: 100%; height: 8px; background-color: rgba(255, 255, 255, 0.05); border-radius: 999px; overflow: hidden; position: relative; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="width: ${this.generationProgress}%; height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-magenta)); border-radius: 999px; transition: width 0.1s linear;"></div>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #94a3b8;">
                    <span>سيتطلب ما يقارب: ${this.generationTimeRemaining} ثانية</span>
                    <span style="font-family: monospace; font-size: 0.72rem;">Model: gemini-3.1-flash</span>
                  </div>
                </div>
              ` : ''}
            </div>

            ${this.generatedAudioUrl ? html`
              <div style="margin-top: 1.25rem; padding: 1.25rem; border-radius: 12px; background-color: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
                  <span style="font-size: 0.9rem; font-weight: 700; color: #34d399; display: flex; align-items: center; gap: 0.4rem;">
                    <span>🎉 تم توليد المقطع بنجاح! استمع للمعاينة:</span>
                  </span>
                  <div style="display: flex; gap: 0.5rem;">
                    ${this.likedAudioBlob ? html`
                      <span style="display: inline-flex; align-items: center; gap: 0.3rem; color: #34d399; font-weight: 700; font-size: 0.82rem; padding: 0.4rem 0.8rem; background-color: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); border-radius: 8px;">
                        ✓ تم اعتماد وتضمين الصوت بالدرس
                      </span>
                    ` : html`
                      <button 
                        type="button" 
                        @click=${this.handleLikeAudio}
                        style="padding: 0.5rem 1rem; font-size: 0.82rem; background-color: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 750; transition: all 0.2s;"
                      >
                        👍 عجبني، اربطه بالدرس
                      </button>
                    `}
                    <button 
                      type="button" 
                      @click=${this.handleDiscardTTS}
                      style="padding: 0.5rem 1rem; font-size: 0.82rem; background-color: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; cursor: pointer; font-weight: 750; transition: all 0.2s;"
                    >
                      حذف وإعادة توليد 🗑️
                    </button>
                  </div>
                </div>
                <audio style="width: 100%; border-radius: 8px; background: rgba(0,0,0,0.5);" controls src=${this.generatedAudioUrl || 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAAACABAAZGF0YQQAAAAAAA=='}></audio>
                
                <!-- Display direct HTML EMBED source code for user to copy -->
                <div style="margin-top: 0.5rem; padding: 0.75rem; border-radius: 8px; background-color: rgba(0, 0, 0, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.85rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-weight: 700; color: #94a3b8; font-size: 0.78rem;">كود HTML للصوت (مضمن كلياً Base64 ولا يتأثر بتغيير المتصفح):</span>
                    <button 
                      type="button"
                      @click=${this.handleCopyHTMLEmbed}
                      style="font-size: 0.72rem; background: var(--primary-color, #a855f7); border: none; color: white; padding: 0.3rem 0.6rem; border-radius: 6px; cursor: pointer; font-weight: 700; transition: all 0.2s;"
                    >
                      نسخ كود للتصدير
                    </button>
                  </div>
                  <textarea 
                    readonly
                    id="html-code-area"
                    style="width: 100%; height: 50px; font-family: monospace; font-size: 0.72rem; background: #000; color: #34d399; border: 1px solid #222; border-radius: 6px; padding: 0.3rem; box-sizing: border-box; resize: none; direction: ltr;"
                  >${`<audio src="${this.generatedBase64}" controls></audio>`}</textarea>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Manual Audio Upload -->
          <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem; text-align: right;">
            <label for="audio-input" style="font-weight: 700; font-size: 0.95rem; color: #ffffff; display: flex; align-items: justify; justify-content: flex-start; flex-wrap: wrap; gap: 0.4rem;">
              <span>🎵 رفع ملف صوتي بديل للدرس (يدوي)</span>
              ${isEditing
                ? html`<span style="font-size: 0.75rem; color: #94a3b8; font-weight: 500;">(اختياري: اتركه فارغاً للاحتفاظ بملف الصوت الحالي)</span>`
                : ''}
            </label>
            <div style="background: rgba(0, 0, 0, 0.2); border: 1.5px dashed rgba(255,255,255,0.12); padding: 1rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative;">
               <input 
                 id="audio-input" 
                 type="file" 
                 accept="audio/*"
                 style="opacity: 0; position: absolute; top:0; left:0; width:100%; height:100%; cursor:pointer;"
                 @change=${(e: Event) => {
                   const fileInput = e.target as HTMLInputElement;
                   const label = document.getElementById('audio-upload-label');
                   if (fileInput.files && fileInput.files[0] && label) {
                     label.textContent = `✓ تم اختيار: ${fileInput.files[0].name}`;
                     label.style.color = '#34d399';
                   }
                 }}
               />
               <span id="audio-upload-label" style="font-size: 0.85rem; color: #94a3b8; pointer-events: none; transition: color 0.2s;">📁 اسحب وافلت ملف الصوت هنا، أو اضغط للتصفح</span>
            </div>
          </div>

          <!-- Actions Grid Panel -->
          <div class="form-actions" style="margin-top: 1rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; gap: 0.75rem; align-items: center; justify-content: flex-end; flex-wrap: wrap;">
            ${isEditing
              ? html`<button
                  type="button"
                  class="delete-btn"
                  @click=${this.handleDelete}
                  style="background-color: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.8rem 1.5rem; border-radius: 10px; font-weight: 750; font-size: 0.9rem; cursor: pointer; transition: all 0.2s;"
                >
                  حذف الدرس نهائياً 🗑️
                </button>`
              : ''}
            <button
              type="button"
              class="cancel-btn"
              @click=${this.handleCancel}
              style="background-color: rgba(255, 255, 255, 0.04); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.1); padding: 0.8rem 1.5rem; border-radius: 10px; font-weight: 750; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; margin-right: auto;"
            >
              إلغاء الرجوع ✕
            </button>
            <button 
              type="submit" 
              class="save-btn"
              style="background: linear-gradient(135deg, var(--primary-color, #a855f7), var(--accent-magenta, #d946ef)); color: white; border: none; padding: 0.8rem 2rem; border-radius: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3); transition: all 0.2s;"
            >
              ${isEditing ? 'حفظ وتحديث الدرس 💾' : 'حفظ ونشر الدرس الجديد 🚀'}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'add-lesson-view': AddLessonView;
  }
}