/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { svg, css, html, LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

import { throttle } from './throttle';
import { MidiDispatcher } from './MidiDispatcher';

import type { PlaybackState, Prompt } from './types';

import '../components/PlayPauseButton';
import '../components/WeightKnob';
import type { WeightKnob } from '../components/WeightKnob';
import '../components/PromptController';


/** The grid of prompt inputs. */
@customElement('prompt-dj-midi')
export class PromptDjMidi extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      position: relative;
    }
    #background {
      will-change: background-image;
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: -1;
      background: #111;
    }
    #grid {
      width: 80vmin;
      height: 80vmin;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2.5vmin;
      margin-top: 8vmin;
    }
    prompt-controller {
      width: 100%;
    }
    play-pause-button {
      position: relative;
      width: 15vmin;
    }
    #buttons {
      position: absolute;
      top: 0;
      left: 0;
      padding: 5px;
      display: flex;
      gap: 5px;
    }
    button {
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      color: #fff;
      background: #0002;
      -webkit-font-smoothing: antialiased;
      border: 1.5px solid #fff;
      border-radius: 4px;
      user-select: none;
      padding: 3px 6px;
      &.active {
        background-color: #fff;
        color: #000;
      }
    }
    select {
      font: inherit;
      padding: 5px;
      background: #fff;
      color: #000;
      border-radius: 4px;
      border: none;
      outline: none;
      cursor: pointer;
    }
  `;

  private prompts: Map<string, Prompt>;
  private midiDispatcher: MidiDispatcher;

  @property({ type: Boolean }) private showMidi = false;
  @property({ type: String }) public playbackState: PlaybackState = 'stopped';
  @state() public audioLevel = 0;
  @state() private midiInputIds: string[] = [];
  @state() private activeMidiInputId: string | null = null;

  @property({ type: Object })
  private filteredPrompts = new Set<string>();

  constructor(
    initialPrompts: Map<string, Prompt>,
  ) {
    super();
    this.prompts = initialPrompts;
    this.midiDispatcher = new MidiDispatcher();
  }

  private handlePromptChanged(e: CustomEvent<Prompt>) {
    const { promptId, text, weight, cc } = e.detail;
    const prompt = this.prompts.get(promptId);

    if (!prompt) {
      console.error('prompt not found', promptId);
      return;
    }

    prompt.text = text;
    prompt.weight = weight;
    prompt.cc = cc;

    const newPrompts = new Map(this.prompts);
    newPrompts.set(promptId, prompt);

    this.prompts = newPrompts;
    (this as any).requestUpdate();

    (this as unknown as HTMLElement).dispatchEvent(
      new CustomEvent('prompts-changed', { detail: this.prompts }),
    );
  }

  /** Generates radial gradients for each prompt based on weight and color. */
  private readonly makeBackground = throttle(
    () => {
      const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

      const MAX_WEIGHT = 0.5;
      const MAX_ALPHA = 0.6;

      const bg: string[] = [];

      [...this.prompts.values()].forEach((prompt) => {
        if (this.filteredPrompts.has(prompt.text)) return;
        
        const alpha = clamp01(prompt.weight / MAX_WEIGHT) * MAX_ALPHA;
        bg.push(`radial-gradient(circle at center, ${prompt.color}${Math.round(alpha * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`);
      });
      
      const backgroundEl = (this as unknown as HTMLElement).shadowRoot?.getElementById('background');
      if (backgroundEl) {
        backgroundEl.style.backgroundImage = bg.join(',');
      }
    },
    50
  );

  connectedCallback() {
    super.connectedCallback();
    this.midiDispatcher.getMidiAccess().then((ids) => {
      this.midiInputIds = ids;
      this.activeMidiInputId = this.midiDispatcher.activeMidiInputId;
    });
  }

  updated() {
    this.makeBackground();
  }

  private toggleMidi() {
    this.showMidi = !this.showMidi;
  }

  private handleMidiInputChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.activeMidiInputId = select.value;
    this.midiDispatcher.activeMidiInputId = select.value;
  }
  
  private handlePlayPause() {
    (this as unknown as HTMLElement).dispatchEvent(new CustomEvent('play-pause'));
  }

  render() {
    return html`
      <div id="background"></div>
      <div id="buttons">
        <button @click=${this.toggleMidi} class=${classMap({active: this.showMidi})}>MIDI</button>
        ${this.showMidi && this.midiInputIds.length > 0 ? html`
          <select @change=${this.handleMidiInputChange}>
            ${this.midiInputIds.map(id => html`
              <option .value=${id} ?selected=${id === this.activeMidiInputId}>
                ${this.midiDispatcher.getDeviceName(id)}
              </option>
            `)}
          </select>
        ` : ''}
      </div>
      <div id="grid">
        ${[...this.prompts.values()].map(
          (prompt) => html`
            <prompt-controller
              promptId=${prompt.promptId}
              .text=${prompt.text}
              .weight=${prompt.weight}
              .color=${prompt.color}
              .cc=${prompt.cc}
              .showCC=${this.showMidi}
              ?filtered=${this.filteredPrompts.has(prompt.text)}
              .midiDispatcher=${this.midiDispatcher}
              .audioLevel=${this.audioLevel}
              @prompt-changed=${this.handlePromptChanged}></prompt-controller>
          `,
        )}
      </div>
      <play-pause-button
        .playbackState=${this.playbackState}
        @click=${this.handlePlayPause}></play-pause-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'prompt-dj-midi': PromptDjMidi
  }
}