import { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import translations from '../locales/translations.json';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key) => {
    // Basic flat lookup since translations.json is currently flat
    // but this structure allows for easier extension later
    return translations[language][key] || translations['en'][key] || key;
  }, [language]);

  const value = useMemo(() => ({ 
    language, 
    setLanguage, 
    t 
  }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
