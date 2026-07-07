/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const DB_NAME = 'EnglishLearningAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'lessonsAudio';
let db: IDBDatabase;

export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', (event.target as IDBRequest).error);
      reject('Error opening database.');
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = (event.target as IDBOpenDBRequest).result;
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export function saveAudio(id: number, audioBlob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!db) {
        return reject('DB not initialized.');
    }
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id, audioBlob });

    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => {
        console.error('Save audio transaction error:', (event.target as IDBTransaction).error);
        reject('Error saving audio file.');
    };
  });
}

export function getAudio(id: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!db) {
        return reject('DB not initialized.');
    }
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.audioBlob);
      } else {
        reject('Audio not found for the given ID.');
      }
    };
    
    request.onerror = (event) => {
        console.error('Get audio request error:', (event.target as IDBRequest).error);
        reject('Error fetching audio file.');
    };
  });
}

export function deleteAudio(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!db) {
            return reject('DB not initialized.');
        }
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.delete(id);

        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) => {
            console.error('Delete audio transaction error:', (event.target as IDBTransaction).error);
            reject('Error deleting audio file.');
        };
    });
}