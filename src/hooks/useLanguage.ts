import { useSyncExternalStore } from 'react';
import { translations } from '../data/translations';

// Global event fired whenever the language changes, so every hook consumer
// re-reads the store in sync.
const languageChangeEvent = new Event('alio-language-change');

const DEFAULT_LANG = 'pt'; // Portuguese as default

/** Read the current language from localStorage, falling back to the default. */
function getSnapshot(): string {
  try {
    const saved = localStorage.getItem('alio-language');
    if (saved && translations[saved]) return saved;
  } catch {
    /* ignore (private mode / SSR) */
  }
  return DEFAULT_LANG;
}

/** Subscribe to in-app language changes and cross-tab storage updates. */
function subscribe(callback: () => void): () => void {
  window.addEventListener('alio-language-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('alio-language-change', callback);
    window.removeEventListener('storage', callback);
  };
}

export const useLanguage = () => {
  // External-store sync (no setState-in-effect); reads localStorage on every
  // render and re-renders on the custom event — same behaviour as before.
  const currentLanguage = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_LANG);

  const changeLanguage = (languageCode: string) => {
    if (translations[languageCode]) {
      localStorage.setItem('alio-language', languageCode);
      window.dispatchEvent(languageChangeEvent); // Notify all listeners
    }
  };

  const t = translations[currentLanguage];

  return {
    currentLanguage,
    changeLanguage,
    t,
  };
};
