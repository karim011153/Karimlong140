/**
 * @fileoverview English Learning App main entry point.
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import './components/EnglishLearningApp';

function main() {
  const app = document.createElement('english-learning-app');
  document.body.appendChild(app as unknown as Node);

  // Register the service worker to ensure PWA installability and display the correct icon on mobile homescreens.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registered successfully with scope: ', registration.scope);
        })
        .catch((error) => {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
  if ('caches' in window) {
    caches.keys().then((keys) => {
      for (const key of keys) {
        caches.delete(key);
      }
    });
  }
}

main();