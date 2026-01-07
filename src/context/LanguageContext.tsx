// src/context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Basic translation dictionary
const translations: Record<string, Record<string, string>> = {
  'en-us': {
    dashboard: 'Dashboard',
    employees: 'Employees',
    attendance: 'Attendance',
    payroll: 'Payroll',
    recruitment: 'Recruitment',
    performance_management: 'Performance',
    documents: 'Documents',
    exit_management: 'Exit',
    admin_settings: 'Settings',
    collapse: 'Collapse',
    expand: 'Expand',
  },
  'hi': {
    dashboard: 'डैशबोर्ड',
    employees: 'कर्मचारी',
    attendance: 'उपस्थिति',
    payroll: 'वेतन',
    recruitment: 'भर्ती',
    performance_management: 'प्रदर्शन',
    documents: 'दस्तावेज़',
    exit_management: 'निकास',
    admin_settings: 'सेटिंग्स',
    collapse: 'संक्षिप्त करें',
    expand: 'विस्तृत करें',
  },
  'mr': {
    dashboard: 'डॅशबोर्ड',
    employees: 'कर्मचारी',
    attendance: 'उपस्थिती',
    payroll: 'पेरोल',
    recruitment: 'भरती',
    performance_management: 'कामगिरी',
    documents: 'दस्तऐवज',
    exit_management: 'बाहेर पडणे',
    admin_settings: 'सेटिंग्ज',
    collapse: 'कॉलॅप्स',
    expand: 'विस्तार',
  },
  // Add other languages as needed...
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState('en-us');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLanguage = localStorage.getItem('hrms-language');
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (isClient) {
      localStorage.setItem('hrms-language', lang);
    }
  };

  const t = (key: string): string => {
    // Return key immediately if not client-side yet
    if (!isClient) return key;
    
    // Try to get translation for current language
    const langTranslations = translations[language];
    if (langTranslations && langTranslations[key]) {
      return langTranslations[key];
    }
    
    // Fallback to English
    const englishTranslations = translations['en-us'];
    if (englishTranslations && englishTranslations[key]) {
      return englishTranslations[key];
    }
    
    // Return the key itself if no translation found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return a default context to prevent crashes
    return {
      language: 'en-us',
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
}