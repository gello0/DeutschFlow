
// Keys used in the app
export const KEYS = {
  VOCAB_WORDS: 'vocab_words',
  VOCAB_INDEX: 'vocab_index',
  VOCAB_LEVEL: 'vocab_level',
  VOCAB_FAVORITES: 'vocab_favorites',
  BOOK_PROGRESS: 'book_progress',
  SENTENCE_PROGRESS: 'sentence_progress',
  JOURNAL_ENTRIES: 'journal_entries'
};

const API_ENDPOINT = '/api/storage';

// Generic Load Function
export const loadData = async <T>(key: string, defaultValue: T): Promise<T> => {
  // 1. Try LocalStorage first for instant render
  const localData = localStorage.getItem(key);
  let result = defaultValue;

  if (localData) {
    try {
      result = JSON.parse(localData);
    } catch (e) {
      console.error(`Error parsing local data for ${key}`, e);
    }
  }

  // 2. Try MongoDB API (Cross-platform sync)
  try {
    const response = await fetch(`${API_ENDPOINT}?key=${key}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data && data.value !== undefined && data.value !== null) {
        // If cloud data exists, update local and return cloud data
        localStorage.setItem(key, JSON.stringify(data.value));
        return data.value as T;
      }
    }
  } catch (e) {
    // Silent fail for offline/dev mode without server
    // console.warn(`Sync warning for ${key} (Backend might be offline)`, e);
  }

  return result;
};

// Generic Save Function
export const saveData = async <T>(key: string, value: T): Promise<void> => {
  // 1. Save Local
  localStorage.setItem(key, JSON.stringify(value));

  // 2. Save Cloud (Fire and forget)
  try {
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value })
    }).catch(err => {
       // Ignore network errors in background save
    });
  } catch (e) {
    // Ignore
  }
};
