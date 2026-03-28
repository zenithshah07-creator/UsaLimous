"use client";
import React, { createContext, useContext, useState } from 'react';
import { translations, Language } from '@/data/translations';

interface LanguageContextType {
  locale: Language;
  setLocale: (locale: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Language;
      return (savedLocale === 'en' || savedLocale === 'es') ? savedLocale : 'en';
    }
    return 'en';
  });

  const handleSetLocale = (newLocale: Language) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let result: any = translations[locale];
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    
    return typeof result === 'string' ? result : path;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
