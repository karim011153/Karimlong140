
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export interface Word {
  text: string;
  start: number;
  end: number;
}

export interface Lesson {
  id: number;
  title: string;
  audioSrc: string;
  content: Word[];
  text: string; // Added raw text for paragraph processing
  translation?: string;
  isReference?: boolean;
  referenceRange?: { start: number; end: number };
}

// Fix: Added missing type definitions used across the application.
export type PlaybackState = 'stopped' | 'playing' | 'paused' | 'loading';

export interface Prompt {
  promptId: string;
  text: string;
  weight: number;
  cc: number;
  color: string;
}

export interface ControlChange {
  channel: number;
  cc: number;
  value: number;
}
