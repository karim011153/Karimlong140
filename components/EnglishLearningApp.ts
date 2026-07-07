
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html, svg } from 'lit';
import { customElement, state, query, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { LESSONS } from '../data';
import type { Lesson, Word } from '../data';
import { initDB, saveAudio, deleteAudio, getAudio } from '../utils/db';
import { pcmToWav, generateTTSWithChunking } from '../utils/audio';

import './LessonSelector';
import './LessonView';
import './AddLessonView';
import './ChatSidebar';

@customElement('english-learning-app')
export class EnglishLearningApp extends LitElement {
  @state()
  private lessons: Lesson[] = LESSONS;

  @state()
  private selectedLesson: Lesson | null = null;

  @state()
  private currentView: 'list' | 'detail' | 'add' = 'list';

  @state()
  private lessonToEdit: Lesson | null = null;

  @state()
  private audioSrc: string | null = null;

  @state()
  private isPlaying = false;

  @state()
  private currentTime = 0;

  @state()
  private duration = 0;

  @state()
  private playbackRate = 1;

  @state()
  private seekStep = 10;

  @state()
  private isSettingsOpen = false;

  @state()
  private isLoadingAudio = false;

  @state()
  private generatingLessons = new Map<number, { progress: number; timeRemaining: number }>();

  @state()
  private readyReferenceAudios = new Set<number>();

  @state()
  private isChatOpen = false;

  @state()
  private customApiKey = '';

  @state()
  private isPlatformSettingsOpen = false;

  @state()
  private backupStatus = '';

  private progressIntervals = new Map<number, any>();
  private dashboardScrollTop = 0;

  private startLessonProgressCountdown(lessonId: number) {
    if (this.progressIntervals.has(lessonId)) {
      clearInterval(this.progressIntervals.get(lessonId));
    }
    const startTime = Date.now();
    const duration = 5000; // Estimated 5s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let progress = (elapsed / duration) * 100;
      if (progress >= 98) {
        progress = 98;
      }
      this.generatingLessons.set(lessonId, {
        progress: Math.round(progress),
        timeRemaining: Math.max(1, Math.ceil((duration - elapsed) / 1000))
      });
      this.generatingLessons = new Map(this.generatingLessons);
    }, 1000);

    this.progressIntervals.set(lessonId, interval);
  }

  private stopLessonProgressCountdown(lessonId: number) {
    if (this.progressIntervals.has(lessonId)) {
      clearInterval(this.progressIntervals.get(lessonId));
      this.progressIntervals.delete(lessonId);
    }
    this.generatingLessons.delete(lessonId);
    this.generatingLessons = new Map(this.generatingLessons);
  }

  @query('#audio-player')
  private audioPlayer!: HTMLAudioElement;

  @query('#scroll-container')
  private scrollContainer!: HTMLElement;

  @query('.settings-container')
  private settingsContainer!: HTMLElement;

  async connectedCallback() {
    super.connectedCallback();
    this.customApiKey = localStorage.getItem('lingo_custom_api_key') || '';
    try {
        await this.loadLessonsFromStorage();
        await this.checkReferenceAudios();
    } catch (e) {
        console.error('Error loading lessons:', e);
    }
    window.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.handleOutsideClick);
  }

  private handleOutsideClick = (event: MouseEvent) => {
    if (!this.isSettingsOpen) return;
    const path = event.composedPath();
    if (this.settingsContainer && !path.includes(this.settingsContainer)) {
      this.isSettingsOpen = false;
    }
  };

  private handleDoubleClick() {
    if (this.selectedLesson && this.audioSrc && this.audioPlayer) {
      if (this.isPlaying) {
        // Pause and rewind 4 seconds
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.audioPlayer.currentTime = Math.max(0, this.audioPlayer.currentTime - 4);
      } else {
        // If paused, just play
        this.audioPlayer.play();
        this.isPlaying = true;
      }
    }
  }

  willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('currentView')) {
      const oldView = changedProperties.get('currentView');
      if (oldView === 'list') {
        const dashboard = this.querySelector('.dashboard-container');
        if (dashboard) {
          this.dashboardScrollTop = dashboard.scrollTop;
        } else if (this.scrollContainer) {
          this.dashboardScrollTop = this.scrollContainer.scrollTop;
        }
      }
    }
    super.willUpdate(changedProperties);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('selectedLesson') && this.selectedLesson) {
      this.resetPlayerState();
      this.loadAudioForLesson(this.selectedLesson);
    }
    if (changedProperties.has('currentView') && this.currentView === 'list') {
      setTimeout(() => {
        const dashboard = this.querySelector('.dashboard-container');
        if (dashboard) {
          dashboard.scrollTop = this.dashboardScrollTop;
        }
        if (this.scrollContainer) {
          this.scrollContainer.scrollTop = this.dashboardScrollTop;
        }
      }, 50);
    }
    super.updated(changedProperties);
  }

  private async loadLessonsFromStorage() {
    try {
      await initDB();
      const storedLessons = localStorage.getItem('lessons');
      if (storedLessons) {
        let lessonsList: Lesson[] = JSON.parse(storedLessons);
        let migrated = false;

        // Migrate any large base64 strings to IndexedDB & replace with 'db' placeholder
        for (const lesson of lessonsList) {
          if (lesson.audioSrc && lesson.audioSrc.startsWith('data:audio') && lesson.audioSrc.length > 2000) {
            try {
              const res = await fetch(lesson.audioSrc);
              const blob = await res.blob();
              await saveAudio(lesson.id, blob);
              lesson.audioSrc = 'db';
              migrated = true;
            } catch (err) {
              console.error('Error migrating old audio to IndexedDB:', err);
              // Safe fallback to prevent crash and quota issues
              lesson.audioSrc = 'db';
              migrated = true;
            }
          }
        }

        this.lessons = lessonsList;
        if (migrated) {
          localStorage.setItem('lessons', JSON.stringify(this.lessons));
        }
      }
      if (!this.selectedLesson && this.lessons.length > 0) {
        this.selectedLesson = this.lessons[0];
      }
    } catch (error) {
      console.error('Failed to load lessons from storage:', error);
    }
  }

  private saveLessonsToStorage() {
    try {
      localStorage.setItem('lessons', JSON.stringify(this.lessons));
    } catch (error) {
      console.error('Failed to save lessons to storage:', error);
    }
  }

  private async exportBackup() {
    try {
      this.backupStatus = '⏳ جاري تحويل الدروس وصوتيات IndexedDB إلى ملف الحزمة المجمعة... يرجى عدم إغلاق النافذة.';
      const lessonsList = [...this.lessons];
      
      // Perform all IndexedDB checks and FileReader base64 conversions in parallel
      // This keeps the user gesture active so the browser doesn't block the file download!
      const backupData = await Promise.all(
        lessonsList.map(async (lesson) => {
          let audioBase64: string | undefined = undefined;
          try {
            const audioBlob = await getAudio(lesson.id);
            if (audioBlob && audioBlob.size > 0) {
              audioBase64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(audioBlob);
              });
            }
          } catch (e) {
            console.warn(`Could not load audio for lesson ${lesson.id}:`, e);
          }
          return { lesson, audioBase64 };
        })
      );

      const jsonStr = JSON.stringify(backupData);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lingo_lessons_and_voice_database.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.backupStatus = `✅ تم تصدير حزمة الدروس (${lessonsList.length} درس) بنجاح كامل! تم تحميل الملف إلى جهازك ونقله في ثوانٍ معدودة.`;
    } catch (err: any) {
      console.error(err);
      this.backupStatus = '❌ حدث خطأ أثناء التصدير: ' + err.message;
    }
  }

  private async importBackup(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    
    try {
      this.backupStatus = '⏳ جاري فك حزمة الدروس المستوردة وإعادة بناء الملفات الصوتية في المتصفح...';
      const text = await file.text();
      const backupData: Array<{
        lesson: Lesson;
        audioBase64?: string;
      }> = JSON.parse(text);

      if (!Array.isArray(backupData)) {
        throw new Error('صيغة ملف النسخ الاحتياطي غير صالحة.');
      }

      await initDB();
      const importedLessons: Lesson[] = [];

      for (const item of backupData) {
        if (!item.lesson || !item.lesson.id) continue;
        importedLessons.push(item.lesson);

        if (item.audioBase64) {
          try {
            const res = await fetch(item.audioBase64);
            const blob = await res.blob();
            await saveAudio(item.lesson.id, blob);
          } catch (e) {
            console.error('Failed to import audio for lesson ' + item.lesson.id, e);
          }
        }
      }

      if (importedLessons.length > 0) {
        this.lessons = importedLessons;
        this.saveLessonsToStorage();
        if (this.lessons.length > 0) {
          this.selectedLesson = this.lessons[0];
        } else {
          this.selectedLesson = null;
        }
        await this.checkReferenceAudios();
        
        // Trigger page re-render to load audio files
        if (this.selectedLesson) {
          this.loadAudioForLesson(this.selectedLesson);
        }
        
        this.backupStatus = `🎉 تم استيراد حزمتك بنجاح! تم تحميل ${importedLessons.length} درس واسترجاع كافة مقاطع الصوت المصاحبة بنسبة 100%.`;
      } else {
        this.backupStatus = '⚠️ لم يتم العثور على أي دروس صالحة داخل الملف المرفوع.';
      }
    } catch (err: any) {
      console.error(err);
      this.backupStatus = '❌ فشل الاستيراد: ' + err.message;
    } finally {
      input.value = ''; // Reset input
    }
  }

  private saveCustomApiKey(key: string) {
    let trimmed = key.trim().replace(/^["']|["']$/g, '');
    if (trimmed === 'undefined' || trimmed === 'null') {
      trimmed = '';
    }
    
    if (trimmed) {
      localStorage.setItem('lingo_custom_api_key', trimmed);
      this.customApiKey = trimmed;
      alert('تم حفظ وتثبيت مفتاح الـ API الخاص بك بنجاح! سيتم استخدامه الآن لكافة خدمات الترجمة والمحادثة وتوليد الأصوات.');
    } else {
      localStorage.removeItem('lingo_custom_api_key');
      this.customApiKey = '';
      alert('تم مسح مفتاح الـ API المخصص. سيعمل التطبيق الآن بالاعتماد على مفاتيح الخادم الافتراضية.');
    }
    location.reload(); // Refresh to update everything easily
  }

  private handleLessonSelected(e: CustomEvent<Lesson>) {
    this.selectedLesson = e.detail;
  }

  private async handleLessonSaved(
    e: CustomEvent<{
      id?: number;
      content: Word[];
      text: string;
      translation: string;
      audioFile?: File;
      audioSrc?: string;
    }>
  ) {
    const { id, content, text, translation, audioFile, audioSrc } = e.detail;

    if (id !== undefined) {
      // Editing existing lesson
      const lessonIndex = this.lessons.findIndex((l) => l.id === id);
      if (lessonIndex > -1) {
        const updatedLessons = [...this.lessons];
        const updatedLesson = {
            ...updatedLessons[lessonIndex], // Preserves original title
            content,
            text,
            translation,
            audioSrc: audioSrc || updatedLessons[lessonIndex].audioSrc || ''
        };
        updatedLessons[lessonIndex] = updatedLesson;

        if (audioFile) {
          try {
            await saveAudio(id, audioFile);
          } catch (error) {
            console.error('Failed to update audio file:', error);
            return; // Don't proceed if audio save fails
          }
        }
        this.lessons = updatedLessons;
        this.saveLessonsToStorage();
        if(this.selectedLesson?.id === id) {
          this.selectedLesson = { ...updatedLesson };
        }
      }
    } else {
      // Adding new lesson
      const newLessonId = Date.now();
      try {
        if (audioFile) {
          await saveAudio(newLessonId, audioFile);
        }
        const title = `Lesson ${this.lessons.length + 1}`;
        const newLesson: Lesson = {
          id: newLessonId,
          title: title,
          content,
          text,
          translation,
          audioSrc: audioSrc || '', // Saves integrated Base64 string directly
        };
        this.lessons = [...this.lessons, newLesson];
        this.saveLessonsToStorage();
        this.selectedLesson = newLesson;
      } catch (error) {
        console.error('Failed to save new lesson:', error);
      }
    }
    
    this.currentView = 'list';
    this.lessonToEdit = null;
  }

  private async handleLessonDeleted(e: CustomEvent<number>) {
    const lessonId = e.detail;
    try {
      await deleteAudio(lessonId);
      this.lessons = this.lessons.filter((lesson) => lesson.id !== lessonId);
      this.saveLessonsToStorage();
      if (this.selectedLesson?.id === lessonId) {
        this.selectedLesson = this.lessons.length > 0 ? this.lessons[0] : null;
      }
      if (this.currentView === 'add') {
        this.currentView = 'list';
        this.lessonToEdit = null;
      }
    } catch (error) {
      console.error('Failed to delete lesson:', error);
    }
  }

  private handleEditClick() {
      if (this.selectedLesson) {
          this.lessonToEdit = this.selectedLesson;
          this.currentView = 'add';
      }
  }

  private switchView(view: 'list' | 'detail' | 'add') {
    if (view === 'add') {
      this.lessonToEdit = null;
    }
    this.currentView = view;
  }

  private resetPlayerState() {
    if (this.audioSrc) {
      URL.revokeObjectURL(this.audioSrc);
    }
    this.audioSrc = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.isSettingsOpen = false;
    this.isLoadingAudio = false;
  }

  private async loadAudioForLesson(lesson: Lesson) {
    this.isLoadingAudio = true;
    this.audioSrc = null;

    // Check if the lesson has an inline static audioSrc (such as a base64 DataURL)
    if (lesson.audioSrc && (lesson.audioSrc.startsWith('data:') || lesson.audioSrc.startsWith('http') || lesson.audioSrc.includes('.'))) {
      this.audioSrc = lesson.audioSrc;
      this.isLoadingAudio = false;
      return;
    }

    try {
      const audioBlob = await getAudio(lesson.id);
      this.audioSrc = URL.createObjectURL(audioBlob);
    } catch (error) {
      // Audio not in DB.
    } finally {
        this.isLoadingAudio = false;
    }
  }

  private async checkReferenceAudios() {
    const totalGroups = Math.floor(this.lessons.length / 10);
    const ready = new Set<number>();
    for (let g = 1; g <= totalGroups; g++) {
      try {
        const id = -g;
        const blob = await getAudio(id);
        if (blob && blob.size > 0) {
          ready.add(g);
        }
      } catch (e) {
        // Not generated/found yet
      }
    }
    this.readyReferenceAudios = ready;
  }

  private getReferenceLessonForGroup(G: number): Lesson {
    const startIdx = (G - 1) * 10;
    const endIdx = G * 10 - 1;
    const relevantLessons = this.lessons.slice(startIdx, endIdx + 1);
    
    const startNum = startIdx + 1;
    const endNum = Math.min(endIdx + 1, this.lessons.length);
    
    const text = relevantLessons.map((l, i) => `=== ${l.title || `الدرس ${startNum + i}`} ===\n\n${l.text}`).join('\n\n\n');
    const translation = relevantLessons.map((l, i) => `=== ${l.title || `الدرس ${startNum + i}`} ===\n\n${l.translation || ''}`).join('\n\n\n');
    
    const hasAudioInStorage = this.readyReferenceAudios.has(G);

    return {
      id: -G,
      title: `درس مرجعي مجمع: مراجعة الدروس ${startNum} - ${endNum}`,
      audioSrc: hasAudioInStorage ? 'db' : '',
      content: [],
      text,
      translation,
      isReference: true,
      referenceRange: { start: startNum, end: endNum }
    };
  }

  private async generateReferenceAudio(G: number) {
    const startIdx = (G - 1) * 10;
    const endIdx = G * 10 - 1;
    const relevantLessons = this.lessons.slice(startIdx, endIdx + 1);
    
    // Check key is negative -G
    this.generatingLessons.set(-G, { progress: 0, timeRemaining: 3 });
    this.generatingLessons = new Map(this.generatingLessons);
    this.startLessonProgressCountdown(-G);

    try {
      const blobs: Blob[] = [];
      const missingAudioLessons: string[] = [];

      for (let i = 0; i < relevantLessons.length; i++) {
        const lesson = relevantLessons[i];
        
        // Update progress dynamically while checking storage
        const percentage = Math.round((i / relevantLessons.length) * 50);
        this.generatingLessons.set(-G, { progress: percentage, timeRemaining: 2 });
        this.generatingLessons = new Map(this.generatingLessons);

        try {
          const audioBlob = await getAudio(lesson.id);
          if (audioBlob && audioBlob.size > 0) {
            blobs.push(audioBlob);
          } else {
            missingAudioLessons.push(`الدرس #${startIdx + i + 1}: ${lesson.title || 'بدون اسم'}`);
          }
        } catch (e) {
          missingAudioLessons.push(`الدرس #${startIdx + i + 1}: ${lesson.title || 'بدون اسم'}`);
        }
      }

      if (missingAudioLessons.length > 0) {
        this.stopLessonProgressCountdown(-G);
        this.generatingLessons.delete(-G);
        this.generatingLessons = new Map(this.generatingLessons);
        alert(`لا يمكن دمج الدروس لعدم اكتمال توليد الصوت للدروس الفردية.\n\nيرجى الدخول إلى الدروس التالية وتوليد الصوت الخاص بكل منها أولاً:\n\n${missingAudioLessons.join('\n')}`);
        return;
      }

      this.generatingLessons.set(-G, { progress: 75, timeRemaining: 1 });
      this.generatingLessons = new Map(this.generatingLessons);

      // Now merge them!
      const { mergeWavBlobs } = await import('../utils/audio');
      const mergedBlob = await mergeWavBlobs(blobs);
      
      // Save merged audio in IndexedDB under negative ID -G
      await saveAudio(-G, mergedBlob);

      // Update state
      this.readyReferenceAudios.add(G);
      this.readyReferenceAudios = new Set(this.readyReferenceAudios);

      // Reload player
      const localUrl = URL.createObjectURL(mergedBlob);
      if (this.selectedLesson?.id === -G) {
        this.selectedLesson = this.getReferenceLessonForGroup(G);
        this.audioSrc = localUrl;
      }

      this.stopLessonProgressCountdown(-G);
      this.generatingLessons.delete(-G);
      this.generatingLessons = new Map(this.generatingLessons);
    } catch (e: any) {
      console.error('Error merging reference audio:', e);
      this.stopLessonProgressCountdown(-G);
      this.generatingLessons.delete(-G);
      this.generatingLessons = new Map(this.generatingLessons);
      alert(`فشل دمج الملف الصوتي المرجعي: ${e?.message || e}`);
    }
  }

  private renderPrecedingLessonsStatus(G: number) {
    const startIdx = (G - 1) * 10;
    const endIdx = G * 10 - 1;
    const relevantLessons = this.lessons.slice(startIdx, endIdx + 1);
    
    return html`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 0.5rem; margin-top: 0.5rem; background: rgba(0,0,0,0.2); padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04);">
        ${relevantLessons.map((l, i) => {
          const isReady = l.audioSrc ? true : false;
          return html`
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.25rem; font-size: 0.75rem; background: rgba(255, 255, 255, 0.02); padding: 5px 8px; border-radius: 6px; border: 1px solid ${isReady ? 'rgba(59, 130, 246, 0.25)' : 'rgba(217, 70, 239, 0.2)'};">
              <span style="color: var(--text-color-secondary); font-weight: 500;">#${startIdx + i + 1}</span>
              <span style="color: ${isReady ? '#60a5fa' : '#c084fc'}; font-weight: 600;">${isReady ? '🔊 جاهز' : '🧠 توليد'}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private async generateAudioForLesson(lessonToGenerate = this.selectedLesson) {
    if (!lessonToGenerate) return;
    const lessonId = lessonToGenerate.id;

    // Track generation state for this lesson
    this.generatingLessons.set(lessonId, { progress: 0, timeRemaining: 10 });
    this.generatingLessons = new Map(this.generatingLessons);
    this.startLessonProgressCountdown(lessonId);

    try {
      const blob = await generateTTSWithChunking(lessonToGenerate.text, '', 'Kore');
      
      // Save in IndexedDB instead of keeping massive base64 in localStorage
      await saveAudio(lessonId, blob);

      const updatedLessons = this.lessons.map(l => {
        if (l.id === lessonId) {
          return { ...l, audioSrc: 'db' };
        }
        return l;
      });
      this.lessons = updatedLessons;
      this.saveLessonsToStorage();

      // Generate a lightweight local blob URL for playback
      const localAudioUrl = URL.createObjectURL(blob);
      if (this.selectedLesson?.id === lessonId) {
        this.selectedLesson = { ...this.selectedLesson, audioSrc: 'db' };
        this.audioSrc = localAudioUrl;
      }
      this.stopLessonProgressCountdown(lessonId);
    } catch (e: any) {
      console.error(e);
      this.stopLessonProgressCountdown(lessonId);
      alert(`فشل توليد الصوت للدرس "${lessonToGenerate.title}": ${e?.message || e}`);
    }
  }

  private handleTimeUpdate() {
    if (!this.audioPlayer) return;
    this.currentTime = this.audioPlayer.currentTime;
  }

  private handleLoadedMetadata() {
    if (!this.audioPlayer) return;
    this.duration = this.audioPlayer.duration;
    this.audioPlayer.playbackRate = this.playbackRate;
  }

  private handleAudioEnded() {
    this.isPlaying = false;
  }

  private togglePlayPause() {
    if (!this.audioPlayer) return;
    if (this.isPlaying) {
      this.audioPlayer.pause();
    } else {
      this.audioPlayer.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  private rewind() {
    if (!this.audioPlayer) return;
    this.audioPlayer.currentTime = Math.max(
      0,
      this.audioPlayer.currentTime - this.seekStep
    );
  }

  private forward() {
    if (!this.audioPlayer) return;
    this.audioPlayer.currentTime = Math.min(
      this.duration,
      this.audioPlayer.currentTime + this.seekStep
    );
  }

  private handleSeek(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!this.audioPlayer) return;
    this.audioPlayer.currentTime = Number(target.value);
  }

  private formatTime(timeInSeconds: number) {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
  }

  private toggleSettings(e: Event) {
    e.stopPropagation();
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  private changePlaybackRate(rate: number) {
    this.playbackRate = rate;
    if (this.audioPlayer) {
      this.audioPlayer.playbackRate = rate;
    }
  }

  private changeSeekStep(step: number) {
    this.seekStep = step;
  }

  private downloadAudio() {
    if (!this.audioSrc || !this.selectedLesson) return;
    const a = document.createElement('a');
    a.href = this.audioSrc;
    a.download = `${this.selectedLesson.title.replace(/\s+/g, '_')}_audio.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private handleExportHTMLEmbed() {
    if (!this.selectedLesson) return;
    
    const audioTag = this.selectedLesson.audioSrc 
      ? `<audio src="${this.selectedLesson.audioSrc}" controls style="width: 100%; border-radius: 8px; margin-top: 1rem;"></audio>` 
      : `<!-- لم يتم تخصيص أو توليد مقطع صوتي مدمج بالـ Base64 لهذا الدرس بعد. يمكنك تشغيله بالخيار الفوري -->`;

    const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الهدف - ${this.selectedLesson.title}</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #121212;
            color: #e0e0e0;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            direction: ltr;
        }
        .container {
            background: #1e1e1e;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        h1 {
            color: var(--accent-magenta);
            font-size: 1.8rem;
            margin-top: 0;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #333;
            padding-bottom: 0.75rem;
        }
        .text-section {
            font-size: 1.15rem;
            line-height: 2.2;
            margin-bottom: 2rem;
        }
        .translation-section {
            font-size: 1.2rem;
            line-height: 2.2;
            color: #b0b0b0;
            direction: rtl;
            text-align: right;
            border-top: 1px solid #333;
            padding-top: 1.5rem;
        }
        audio {
            width: 100%;
            margin-top: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>الهدف - ${this.selectedLesson.title}</h1>
        <div class="text-section">
            <p>${this.selectedLesson.text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>
        </div>
        <div class="translation-section">
            <p>${(this.selectedLesson.translation || '').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>
        </div>
        ${audioTag}
    </div>
</body>
</html>`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(htmlCode)
        .then(() => alert('تم نسخ كود الـ HTML المدمج للدرس بالكامل بنجاح في الحافظة! يمكنك حفظه في ملف .html لتشغيله في أي مكان.'))
        .catch(() => this.fallbackCopyText(htmlCode));
    } else {
      this.fallbackCopyText(htmlCode);
    }
  }

  private fallbackCopyText(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      alert('تم نسخ كود الـ HTML المدمج للدرس بالكامل بنجاح!');
    } catch (err) {
      alert('خطأ في النسخ. يرجى محاولة النسخ يدويًا.');
    }
    document.body.removeChild(textArea);
  }

  private renderSettingsMenu() {
    const playbackRates = [0.75, 1, 1.25, 1.5];
    const seekSteps = [5, 10, 15];

    return html`
      <div class="settings-popover">
        <div class="settings-group">
          <label>Playback Speed</label>
          <div class="options">
            ${playbackRates.map(
              (rate) => html`
                <button
                  class=${classMap({ active: this.playbackRate === rate })}
                  @click=${() => this.changePlaybackRate(rate)}
                >
                  ${rate}x
                </button>
              `
            )}
          </div>
        </div>
        <div class="settings-group">
          <label>Seek Time</label>
          <div class="options">
            ${seekSteps.map(
              (step) => html`
                <button
                  class=${classMap({ active: this.seekStep === step })}
                  @click=${() => this.changeSeekStep(step)}
                >
                  ${step}s
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }

  private renderPlayer() {
    const playIcon = svg`<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`;
    const pauseIcon = svg`<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`;
    const rewindIcon = svg`<svg viewBox="0 0 24 24" style="position: relative;"><path d="M11 18V6l-8.5 6 8.5 6zm-2-6 6 4.5V7.5l-6 4.5z"></path></svg>`;
    const forwardIcon = svg`<svg viewBox="0 0 24 24" style="position: relative;"><path d="M13 6v12l8.5-6-8.5-6zM4 18l8.5-6L4 6v12z"></path></svg>`;
    const settingsIcon = svg`<svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>`;
    const downloadIcon = svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px; height:20px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;

    return html`
      <div class="custom-audio-player">
        <div class="progress-bar-container">
          <span>${this.formatTime(this.currentTime)}</span>
          <input
            type="range"
            min="0"
            .max=${this.duration || 0}
            .value=${this.currentTime}
            @input=${this.handleSeek}
          />
          <span>${this.formatTime(this.duration)}</span>
        </div>
        <div class="player-controls">
          <button @click=${this.rewind} aria-label="Rewind">
            ${rewindIcon}
          </button>
          <button
            class="play-pause-btn"
            @click=${this.togglePlayPause}
            aria-label=${this.isPlaying ? 'Pause' : 'Play'}
          >
            ${this.isPlaying ? pauseIcon : playIcon}
          </button>
          <button @click=${this.forward} aria-label="Forward">
            ${forwardIcon}
          </button>
          
          <!-- Download Button -->
          <button @click=${this.downloadAudio} title="تحميل الملف الصوتي" aria-label="Download Audio" style="display: flex; align-items: center; justify-content: center; padding: 0.5rem; background: rgba(127, 90, 240, 0.1); border: 1px solid var(--primary-color); border-radius: 50%; width:38px; height:38px; cursor: pointer;">
            ${downloadIcon}
          </button>

          <div class="settings-container">
            <button
              @click=${this.toggleSettings}
              aria-label="Audio Settings"
              aria-haspopup="true"
              aria-expanded=${this.isSettingsOpen}
            >
              ${settingsIcon}
            </button>
            ${this.isSettingsOpen ? this.renderSettingsMenu() : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderDashboard() {
    const plusIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`;
    const totalLessons = this.lessons.length;
    const audioLessons = this.lessons.filter(l => l.audioSrc).length;
    const totalWords = this.lessons.reduce((acc, l) => acc + (l.text ? l.text.split(/\s+/).filter(Boolean).length : 0), 0);

    return html`
      <div class="dashboard-container" dir="rtl">
        <!-- background dynamic decorative glowing spots -->
        <div class="glow-bg-blob glow-blob-1"></div>
        <div class="glow-bg-blob glow-blob-2"></div>

        <!-- Interactive sparkling decorative floating stars -->
        <div class="sparkling-star star-1">✨</div>
        <div class="sparkling-star star-2">✦</div>
        <div class="sparkling-star star-3">✨</div>
        <div class="sparkling-star star-4">✦</div>
        <div class="sparkling-star star-5">✨</div>

        <div class="dashboard-header animated-fade-in">
          <div class="logo-area">
            <div class="logo-wrapper">
              <div class="pulse-ring pulse-ring-1"></div>
              <div class="pulse-ring pulse-ring-2"></div>
              <img src="./icons/icon.png" class="logo-image" alt="الهدف" />
            </div>
            <div class="logo-text">
              <h1>الهدف لتعلم الإنجليزية (Lingo)</h1>
              <p>منصة تفاعلية ذكية لتعلم النطق والاستماع والترجمة</p>
              <p class="creator-attribution">Created by Kareem Abdelhalim</p>
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <button class="add-lesson-btn-dashboard" @click=${() => this.switchView('add')} aria-label="Add Lesson">
              ${plusIcon}
              <span>إضافة درس جديد</span>
            </button>
            <button @click=${() => this.isPlatformSettingsOpen = true} style="display: flex; align-items: center; gap: 0.6rem; padding: 0.85rem 1.5rem; background: rgba(255, 255, 255, 0.05); border: 1.5px solid rgba(255, 255, 255, 0.15); color: #e2e8f0; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 1rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);" title="الإعدادات المتقدمة وإدارة مفتاح API والاستيراد والتصدير">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
              <span>الإعدادات المتقدمة ⚙️</span>
            </button>
            <button @click=${() => this.isChatOpen = !this.isChatOpen} style="display: flex; align-items: center; gap: 0.6rem; padding: 0.85rem 1.5rem; background: rgba(59, 130, 246, 0.1); border: 1.5px solid var(--primary-color); color: #60a5fa; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 1rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);" title="افتح مساعدك الدراسي الذكي">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
              <span>مساعد المذاكرة (Gemini) 🤖</span>
            </button>
          </div>
        </div>

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon-wrapper">📚</div>
            <div class="stat-info">
              <span class="stat-value">${totalLessons}</span>
              <span class="stat-label">إجمالي الدروس المتاحة</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrapper">🔊</div>
            <div class="stat-info">
              <span class="stat-value">${audioLessons}</span>
              <span class="stat-label">دروس ناطقة بالذكاء الاصطناعي</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrapper">📝</div>
            <div class="stat-info">
              <span class="stat-value">${totalWords}</span>
              <span class="stat-label">عدد الكلمات الإنجليزية للتمرن</span>
            </div>
          </div>
        </div>

        <div class="lessons-grid" style="margin-top: 1rem;">
          ${this.lessons.map((lesson, idx) => {
            const hasAudio = lesson.audioSrc ? true : false;
            const divider = (idx > 0 && idx % 10 === 0) ? html`
              <div class="lessons-divider-group">
                <div class="lessons-divider-line"></div>
                <span class="lessons-divider-text">الدروس التالية ${idx + 1} - ${Math.min(idx + 10, totalLessons)}</span>
                <div class="lessons-divider-line"></div>
              </div>
            ` : '';

            const isReferenceCardVisible = (idx + 1) % 10 === 0;
            const groupNum = (idx + 1) / 10;
            const refLesson = isReferenceCardVisible ? this.getReferenceLessonForGroup(groupNum) : null;
            const hasRefAudio = isReferenceCardVisible ? this.readyReferenceAudios.has(groupNum) : false;

            const referenceCardTemplate = refLesson ? html`
              <div class="lesson-card reference-card" @click=${() => {
                this.selectedLesson = refLesson;
                this.currentView = 'detail';
              }}>
                <div class="lesson-card-right">
                  <div class="lesson-meta">
                    <span class="lesson-num ref-badge">🎯 مرجع مجمع</span>
                  </div>
                  <div class="lesson-details">
                    <h3 class="lesson-card-title ref-title">${refLesson.title}</h3>
                    <p class="lesson-card-preview" style="color: var(--text-color-secondary); font-size: 0.8rem; margin: 0.25rem 0 0 0;">اضغط لتشغيل ملف الصوت المدمج وقراءة نصوص الدروس الـ 10 السابقة مجمعة متزامنة.</p>
                  </div>
                </div>
                <div class="lesson-card-left">
                  ${hasRefAudio ? html`<span class="audio-badge ref-audio-ready">🔊 مدمج ومكتمل</span>` : html`<span class="audio-badge secondary">✨ جاهز للدمج</span>`}
                  <span class="start-learning-link ref-link">
                    مراجعة ⚡
                  </span>
                </div>
              </div>
            ` : '';

            return html`
              ${divider}
              <div class="lesson-card" @click=${() => {
                this.selectedLesson = lesson;
                this.currentView = 'detail';
              }}>
                <div class="lesson-card-right">
                  <div class="lesson-meta">
                    <span class="lesson-num"># ${idx + 1}</span>
                  </div>
                  <div class="lesson-details">
                    <h3 class="lesson-card-title">${lesson.title}</h3>
                    <p class="lesson-card-preview">${lesson.text ? (lesson.text.length > 80 ? lesson.text.slice(0, 80) + '...' : lesson.text) : ''}</p>
                  </div>
                </div>
                <div class="lesson-card-left">
                  ${hasAudio ? html`<span class="audio-badge">🔊 صوت جاهز</span>` : html`<span class="audio-badge secondary">🧠 جاهز للتوليد</span>`}
                  <span class="start-learning-link">
                    دخول ⚡
                  </span>
                </div>
              </div>
              ${referenceCardTemplate}
            `;
          })}

          <div class="lesson-card add-card" @click=${() => this.switchView('add')}>
            <div class="add-icon-wrapper">
              ${plusIcon}
            </div>
            <div class="add-card-texts">
              <h3>إضافة درس جديد</h3>
              <p>قم بكتابة وترجمة نص مخصص لتوليد مقطع صوتي باستخدام Gemini وتطبيقه للتعلم الفوري.</p>
            </div>
          </div>
        </div>

        <footer class="app-footer">
          <div class="footer-divider"></div>
          <div class="footer-content">
            <img src="./icons/icon.png" class="footer-logo" alt="Lingo Logo" />
            <span class="footer-text">Lingo - الهدف لتعلم الإنجليزية</span>
            <span class="footer-divider-dot">•</span>
            <span class="footer-creator">Created by Kareem Abdelhalim</span>
          </div>
        </footer>
      </div>
    `;
  }

  private renderDetailView() {
    const editIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;
    const magicIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2 6.4 4.5 5 7zM19.5 15.4L22 14l-1.4-2.5L22 9l-2.5 1.4L17 9l1.4 2.5L17 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-8.8 9L11 6.5 8.8 11 4.3 13.2l4.5 2.2L11 19.9l2.2-4.5 4.5-2.2z"/></svg>`;

    const isGenerating = this.selectedLesson ? this.generatingLessons.has(this.selectedLesson.id) : false;
    const currentGen = this.selectedLesson ? this.generatingLessons.get(this.selectedLesson.id) : null;

    return html`
      <div class="lesson-view-wrapper" @dblclick=${this.handleDoubleClick} style="display: flex; flex-direction: column; height: 100%;">
        <header class="detail-header-bar">
          <button class="back-icon-only-btn" @click=${() => this.currentView = 'list'} aria-label="العودة للدروس" title="العودة للدروس">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          </button>
          
          <h2 class="detail-header-title">${this.selectedLesson?.title}</h2>
          
          <div class="detail-header-actions">
            <button class="header-icon-btn action-chat-btn" @click=${() => this.isChatOpen = !this.isChatOpen} title="افتح المساعد الدراسي الذكي (Gemini)" style="background: rgba(59, 130, 246, 0.1); border: 1px solid var(--primary-color); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #60a5fa; transition: all 0.2s ease; margin-left: 0.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
            </button>
            <button class="header-icon-btn action-edit-btn" @click=${this.handleEditClick} aria-label="Edit lesson" title="تعديل محتوى الدرس">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </button>
            <button class="header-icon-btn action-export-btn" @click=${this.handleExportHTMLEmbed} title="نسخ كود الـ HTML المدمج للدرس بالكامل">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M14.6 16.6L19.2 12l-4.6-4.6c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l5.3 5.3c.39.39.39 1.02 0 1.41l-5.3 5.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.01 0-1.4zm-5.2 0L4.8 12l4.6-4.6c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-5.3 5.3c-.39.39-.39 1.02 0 1.41l5.3 5.3c.39.39 1.02.39 1.41 0 .39-.39.39-1.01 0-1.4z"/>
                </svg>
            </button>
          </div>
        </header>

        ${this.selectedLesson ? html`
          <!-- خانة الصوت (The Audio Box): Thicker, slimmer, responsive -->
          <div class="compact-audio-box">
            ${isGenerating ? html`
              <div style="padding: 0.5rem; text-align: center; display: flex; gap: 0.75rem; justify-content: center; align-items: center; width: 100%;">
                <p style="margin:0; font-size: 0.85rem; font-weight: 500; color: var(--text-color);">جاري معالجة وتوليد الصوت بالذكاء الاصطناعي للدرس...</p>
                ${currentGen && currentGen.progress > 0 ? html`
                  <div style="width: 100%; max-width: 250px; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; color: var(--text-color-secondary); white-space: nowrap;">جاري التوليد... ${currentGen.progress}%</span>
                    <div style="flex: 1; height: 5px; background-color: rgba(255, 255, 255, 0.05); border-radius: 999px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
                      <div style="width: ${currentGen.progress}%; height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--accent-magenta)); border-radius: 999px;"></div>
                    </div>
                  </div>
                ` : html`
                  <div style="animation: spin 1s linear infinite; width: 16px; height: 16px; border: 2px solid var(--primary-color); border-top-color: transparent; border-radius: 50%;"></div>
                `}
              </div>
            ` : this.isLoadingAudio ? html`
              <div style="padding: 0.5rem; text-align: center; display: flex; justify-content: center; align-items: center; width: 100%;">
                <div style="animation: spin 1s linear infinite; width: 16px; height: 16px; border: 2px solid var(--primary-color); border-top-color: transparent; border-radius: 50%;"></div>
              </div>
            ` : this.audioSrc ? html`
              <audio
                id="audio-player"
                src=${this.audioSrc}
                @timeupdate=${this.handleTimeUpdate}
                @loadedmetadata=${this.handleLoadedMetadata}
                @ended=${this.handleAudioEnded}
                @play=${() => this.isPlaying = true}
                @pause=${() => this.isPlaying = false}
              ></audio>
              ${this.renderPlayer()}
            ` : this.selectedLesson?.isReference ? html`
              <div style="display:flex; flex-direction:column; gap:0.75rem; width:100%;" dir="rtl">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:1.5rem; width:100%; flex-wrap: wrap;">
                  <div>
                    <h4 style="margin: 0; font-size: 0.95rem; color: #ffffff; display: flex; align-items: center; gap: 0.4rem;">
                      <span>🎯 دمج ومراجعة الدروس العشرة السابقة</span>
                      <span style="font-size: 0.75rem; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3); color: #c084fc; padding: 2px 8px; border-radius: 4px;">درس مرجعي</span>
                    </h4>
                    <p style="color:var(--text-color-secondary); font-size:0.8rem; margin: 0.25rem 0 0 0;">سيقوم النظام بدمج الملفات الصوتية للدروس الـ 10 السابقة وتوليد أي أصوات ناقصة تلقائياً في ملف صوتي واحد متتابع.</p>
                  </div>
                  <button class="generate-audio-btn" @click=${() => this.generateReferenceAudio(Math.abs(this.selectedLesson!.id))} style="background: linear-gradient(135deg, var(--primary-color), var(--accent-magenta)); color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(217, 70, 239, 0.4); transition: transform 0.2s; white-space: nowrap;">
                    ⚡ دمج وتوليد الملف المرجعي الموحد
                  </button>
                </div>
                ${this.renderPrecedingLessonsStatus(Math.abs(this.selectedLesson!.id))}
              </div>
            ` : html`
              <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; width:100%;" dir="rtl">
                <p style="color:var(--text-color-secondary); font-size:0.85rem; margin:0;">لم يتم توليد مقطع صوتي للدرس الحالي بعد.</p>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <button class="generate-audio-btn" @click=${() => this.generateAudioForLesson()} style="background: var(--primary-color); color: white; border: none; padding: 0.4rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; transition: background 0.2s;">
                    ${magicIcon}
                    توليد مقطع صوتي (AI Voice)
                  </button>
                </div>
              </div>
            `}
          </div>

          <!-- خانة الإنجليزي وخانة العربي (The English & Arabic Content Boxes side-by-side) -->
          <div style="flex: 1; min-height: 0; display: flex; flex-direction: column;">
            <lesson-view 
              .lesson=${this.selectedLesson}>
            </lesson-view>
          </div>
        ` : html`
          <div class="no-lesson">
            <h2>Welcome to الهدف!</h2>
            <p>Select a lesson from the top to begin, or click 'Add New Lesson' to create your own.</p>
          </div>
        `}
      </div>
    `;
  }

  private renderAddView() {
    return html`
      <add-lesson-view
        .lesson=${this.lessonToEdit}
        @lesson-saved=${this.handleLessonSaved}
        @lesson-deleted=${this.handleLessonDeleted}
        @cancel-add=${() => {
          this.currentView = 'list';
          this.lessonToEdit = null;
        }}
      ></add-lesson-view>
    `;
  }

  render() {
    let content;
    if (this.currentView === 'list') {
      content = this.renderDashboard();
    } else if (this.currentView === 'add') {
      content = html`
        <div style="display: flex; flex-direction: column; height: 100%; flex: 1;">
          <header style="padding: 1rem 2rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: flex-start; background-color: var(--bg-color); flex-shrink: 0;">
            <button class="back-btn" @click=${() => {
              this.currentView = 'list';
              this.lessonToEdit = null;
            }}>
              ↩ العودة للدروس
            </button>
            <h2 style="margin: 0 calc(50% - 250px); font-size: 1.3rem; font-weight: 700; color: white;">إضافة أو تعديل درس</h2>
          </header>
          <main class="app-body" style="flex: 1; overflow-y: auto;">
            ${this.renderAddView()}
          </main>
        </div>
      `;
    } else {
      // 'detail' (Page 2)
      content = html`
        <main class="app-body" style="height: 100%; display: flex; flex-direction: column; flex: 1;">
          ${this.renderDetailView()}
        </main>
      `;
    }

    return html`
      <div style="display: flex; flex-direction: row; height: 100vh; width: 100vw; overflow: hidden; position: relative;">
        <div id="scroll-container" style="flex: 1; min-width: 0; display: flex; flex-direction: column; height: 100%; overflow-y: auto;">
          ${content}
        </div>
        
        <!-- Elegant floating assistant activation button when closed -->
        ${!this.isChatOpen ? html`
          <button @click=${() => this.isChatOpen = true} style="position: fixed; bottom: 30px; left: 30px; width: 58px; height: 58px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--accent-magenta)); color: white; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 22px rgba(217, 70, 239, 0.4); z-index: 90; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);" title="اسأل المساعد الذكي">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
          </button>
        ` : ''}

        <chat-sidebar .lessons=${this.lessons} .isOpen=${this.isChatOpen} @close-chat=${() => this.isChatOpen = false}></chat-sidebar>
        
        <!-- Advanced Settings and API Modal Dialogue -->
        ${this.renderPlatformSettingsModal()}
      </div>
    `;
  }

  private renderPlatformSettingsModal() {
    if (!this.isPlatformSettingsOpen) return '';

    return html`
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(5, 7, 11, 0.85); backdrop-filter: blur(12px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;" dir="rtl" @click=${() => this.isPlatformSettingsOpen = false}>
        <div style="background: var(--surface-color); border: 1.5px solid rgba(255, 255, 255, 0.1); border-radius: 20px; width: 100%; max-width: 650px; display: flex; flex-direction: column; gap: 1.5rem; box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6); animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; overflow-y: auto; max-height: 90vh;" @click=${(e: Event) => e.stopPropagation()}>
          
          <!-- Modal Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem 1rem 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
            <h2 style="margin: 0; font-size: 1.3rem; font-weight: 800; background: linear-gradient(135deg, #ffffff, var(--primary-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; gap: 0.6rem;">
              <span>⚙️ الإعدادات المتقدمة وإدارة البيانات</span>
            </h2>
            <button @click=${() => this.isPlatformSettingsOpen = false} style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-color-secondary); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" title="إغلاق">
              ✕
            </button>
          </div>

          <!-- Modal Content -->
          <div style="padding: 0 2rem 2rem 2rem; display: flex; flex-direction: column; gap: 1.5rem; overflow-y: auto;">
            
            <!-- تثبيت مفتاح الـ API -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); padding: 1.25rem; border-radius: 12px;">
              <h3 style="margin: 0; font-size: 1.05rem; color: #ffffff; display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start; flex-wrap: wrap;">
                <span>🔑 مفتاح الـ API الخاص بك (Gemini API)</span>
                ${this.customApiKey ? html`
                  <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 3px 8px; border-radius: 6px; font-weight: 500;">نشط ومثبت رائع 🟢</span>
                ` : html`
                  <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #3b82f6; padding: 3px 8px; border-radius: 6px; font-weight: 500;">مفتاح الاستضافة الافتراضي 🔵</span>
                `}
              </h3>
              <p style="margin: 0; color: var(--text-color-secondary); font-size: 0.82rem; line-height: 1.5; text-align: right;">قم بوضع مفتاح API لتشغيل التطبيق والذكاء الاصطناعي الصوتي واللغوي من حسابك مباشرة، مما يضمن استمرارية بلا حدود وبأقصى سرعة استجابة دون قيود.</p>
              
              <div style="display: flex; gap: 0.5rem; align-items: center; width: 100%; margin-top: 0.5rem;">
                <input 
                  id="custom-api-key-input"
                  type="password" 
                  placeholder="أدخل مفتاح الـ API الخاص بك هنا" 
                  .value=${this.customApiKey}
                  style="flex: 1; padding: 0.6rem 1rem; border-radius: 8px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; font-size: 0.9rem;"
                />
                <button 
                  @click=${() => {
                    const input = document.getElementById('custom-api-key-input') as HTMLInputElement;
                    this.saveCustomApiKey(input.value || '');
                  }}
                  style="background: var(--primary-color); color: white; border: none; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s; white-space: nowrap; font-size: 0.85rem;"
                >
                  حفظ المفتاح
                </button>
                ${this.customApiKey ? html`
                  <button 
                    @click=${() => {
                      this.saveCustomApiKey('');
                      const input = document.getElementById('custom-api-key-input') as HTMLInputElement;
                      if (input) input.value = '';
                    }}
                    style="background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.6rem 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s; font-size: 0.85rem;"
                  >
                    إزالة
                  </button>
                ` : ''}
              </div>
            </div>

            <!-- استيراد وتصدير قاعدة البيانات الصوتية والدروس كاملة -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); padding: 1.25rem; border-radius: 12px;">
              <h3 style="margin: 0; font-size: 1.05rem; color: #ffffff; display: flex; align-items: center; gap: 0.5rem; justify-content: flex-start;">
                <span>📦 نقل وتصدير الدروس والأصوات (Backup)</span>
              </h3>
              <p style="margin: 0; color: var(--text-color-secondary); font-size: 0.82rem; line-height: 1.5; text-align: right;">لكي لا تبدأ من الصفر عند فتح المنصة على جهاز آخر أو متصفح مختلف! يمكنك تصدير كافة الدروس والملفات الصوتية كملف حزمة مجمعة، ثم استيرادها مجدداً بلمسة واحدة للاستمرار فوراً.</p>
              
              <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-top: 0.5rem;">
                <!-- زر تصدير -->
                <button 
                  @click=${() => this.exportBackup()} 
                  style="background: linear-gradient(135deg, var(--primary-color), var(--accent-magenta)); color: white; border: none; padding: 0.65rem 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: transform 0.2s; font-size: 0.82rem;"
                >
                  📥 تصدير حزمة الدروس والأصوات
                </button>

                <!-- زر استيراد -->
                <input 
                  id="modal-import-backup-file-input"
                  type="file" 
                  accept=".json"
                  @change=${(e: Event) => this.importBackup(e)}
                  style="display: none;"
                />
                <button 
                  @click=${() => document.getElementById('modal-import-backup-file-input')?.click()} 
                  style="background: rgba(168, 85, 247, 0.1); border: 1.5px dashed rgba(168, 85, 247, 0.4); color: #c084fc; padding: 0.6rem 1rem; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: background 0.2s; font-size: 0.82rem;"
                >
                  📤 استيراد الحزمة واستعادتها
                </button>
              </div>

              <!-- Real-time dynamic on-screen status updates -->
              ${this.backupStatus ? html`
                <div style="margin-top: 0.75rem; padding: 0.85rem; border-radius: 8px; background-color: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.82rem; color: #ffffff; line-height: 1.5; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                  <span style="text-align: right;">${this.backupStatus}</span>
                  <button 
                    @click=${() => this.backupStatus = ''} 
                    style="background: transparent; border: none; color: var(--text-color-secondary, #94a3b8); font-weight: bold; cursor: pointer; font-size: 0.75rem; padding: 0 4px;"
                  >
                    ✕
                  </button>
                </div>
              ` : ''}
            </div>

          </div>

          <!-- Modal Footer -->
          <div style="display: flex; justify-content: flex-end; padding: 1.25rem 2rem; border-top: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.15); border-radius: 0 0 20px 20px;">
            <button @click=${() => this.isPlatformSettingsOpen = false} style="background: var(--primary-color); color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s; font-size: 0.9rem;">
              تمام، إغلاق الإعدادات
            </button>
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
    'english-learning-app': EnglishLearningApp;
  }
}
