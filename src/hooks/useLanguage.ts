import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

// Create a global event for language change
const languageChangeEvent = new Event('alio-language-change');

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('pt'); // Portuguese as default

  useEffect(() => {
    const savedLanguage = localStorage.getItem('alio-language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
    // Listen for language change events
    const onLanguageChange = () => {
      const lang = localStorage.getItem('alio-language') || 'pt';
      setCurrentLanguage(lang);
    };
    window.addEventListener('alio-language-change', onLanguageChange);
    return () => window.removeEventListener('alio-language-change', onLanguageChange);
  }, []);

  const changeLanguage = (languageCode: string) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('alio-language', languageCode);
      window.dispatchEvent(languageChangeEvent); // Notify all listeners
    }
  };

  const t = translations[currentLanguage];

  return {
    currentLanguage,
    changeLanguage,
    t
  };
};