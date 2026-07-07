
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { Lesson, Word } from '../utils/types';

@customElement('lesson-view')
export class LessonView extends LitElement {
  @property({ type: Object })
  lesson: Lesson | null = null;

  @query('.english-content')
  private englishContainer!: HTMLElement;

  @query('.arabic-content')
  private arabicContainer!: HTMLElement;

  private isSyncingLeft = false;
  private isSyncingRight = false;

  updated(changedProperties: Map<string, unknown>) {
    // Reset scroll to top when lesson changes
    if (changedProperties.has('lesson')) {
      if (this.englishContainer) this.englishContainer.scrollTop = 0;
      if (this.arabicContainer) this.arabicContainer.scrollTop = 0;
    }
    
    super.updated(changedProperties);
  }

  private handleScroll(source: 'english' | 'arabic') {
    const left = this.englishContainer;
    const right = this.arabicContainer;

    if (!left || !right) return;

    if (source === 'english') {
      if (this.isSyncingLeft) {
        this.isSyncingLeft = false;
        return;
      }
      this.isSyncingRight = true;
      // Calculate percentage
      const percentage = left.scrollTop / (left.scrollHeight - left.clientHeight);
      right.scrollTop = percentage * (right.scrollHeight - right.clientHeight);
    } else {
      if (this.isSyncingRight) {
        this.isSyncingRight = false;
        return;
      }
      this.isSyncingLeft = true;
      const percentage = right.scrollTop / (right.scrollHeight - right.clientHeight);
      left.scrollTop = percentage * (left.scrollHeight - left.clientHeight);
    }
  }

  render() {
    if (!this.lesson) {
      return html``;
    }

    // --- English Processing ---
    const englishText = this.lesson.text || '';
    const normalizedEnglish = englishText.replace(/\n\s*\n/g, '\n\n');
    const englishParagraphs = normalizedEnglish.split('\n\n').filter(p => p.trim().length > 0);

    // --- Arabic Processing ---
    const arabicText = this.lesson.translation || '';
    const normalizedArabic = arabicText.replace(/\n\s*\n/g, '\n\n'); 
    const arabicParagraphs = normalizedArabic.split('\n\n').filter(p => p.trim().length > 0);

    return html`
      <div class="lesson-content-columns">
        <div class="english-content" @scroll=${() => this.handleScroll('english')}>
          ${englishParagraphs.map((para) => html`
            <p>${para}</p>
          `)}
          <div style="height: 20vh;"></div> <!-- Small buffer at bottom -->
        </div>

        <div class="arabic-content" @scroll=${() => this.handleScroll('arabic')}>
          ${arabicParagraphs.map((para) => html`
            <p>${para}</p>
          `)}
          <div style="height: 20vh;"></div>
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
    'lesson-view': LessonView;
  }
}
