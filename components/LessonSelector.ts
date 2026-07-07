/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { Lesson } from '../utils/types';

@customElement('lesson-selector')
export class LessonSelector extends LitElement {
  @property({ type: Array })
  lessons: Lesson[] = [];

  @property({ type: Number })
  selectedLessonId: number | undefined;

  @property({ type: Object })
  generatingLessons: Map<number, { progress: number; timeRemaining: number }> = new Map();

  private selectLesson(lesson: Lesson) {
    (this as unknown as HTMLElement).dispatchEvent(
      new CustomEvent('lesson-selected', {
        detail: lesson,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <ul class="lesson-list">
        ${this.lessons.map(
          (lesson) => {
            const isGenerating = this.generatingLessons?.has(lesson.id);
            const genData = this.generatingLessons?.get(lesson.id);
            return html`
              <li class="lesson-item">
                <button
                  class="lesson-select-btn ${classMap({
                    selected: lesson.id === this.selectedLessonId,
                  })}"
                  @click=${() => this.selectLesson(lesson)}
                >
                  ${lesson.title}
                  ${isGenerating ? html`
                    <span class="gen-badge" style="margin-left: 8px; font-size: 0.75rem; color: var(--accent-magenta); font-weight: bold; border: 1px solid rgba(217, 70, 239, 0.3); padding: 1px 6px; border-radius: 4px; background: rgba(217, 70, 239, 0.1); display: inline-flex; align-items: center; gap: 2px;">
                      ⏳ ${genData ? `${genData.progress}%` : ''}
                    </span>
                  ` : ''}
                </button>
              </li>
            `;
          }
        )}
      </ul>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lesson-selector': LessonSelector;
  }
}