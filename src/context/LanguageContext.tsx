"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export type LanguageCode = "en" | "hi" | "ta" | "te" | "bn" | "mr";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    employees: "Employee Database",
    attendance: "Attendance",
    payroll: "Payroll Management",
    welcome: "Welcome back",
    search: "Search records...",
    logout: "Logout",
    settings: "Settings",
    profile: "Profile",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    employees: "कर्मचारी डेटाबेस",
    attendance: "उपस्थिति",
    payroll: "पेरोल प्रबंधन",
    welcome: "वापस स्वागत है",
    search: "रिकॉर्ड खोजें...",
    logout: "लॉगआउट",
    settings: "सेटिंग्स",
    profile: "प्रोफ़ाइल",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    employees: "பணியாளர் தரவுத்தளம்",
    attendance: "வருகை",
    payroll: "ஊதிய மேலாண்மை",
    welcome: "மீண்டும் வருக",
    search: "பதிவுகளைத் தேடு...",
    logout: "வெளியேறு",
    settings: "அமைப்புகள்",
    profile: "சுயவிவரம்",
  },
  te: {
    dashboard: "డ్యాష్‌బోర్డ్",
    employees: "ఉద్యోగుల డేటాబేస్",
    attendance: "హాజరు",
    payroll: "పేరోల్ నిర్వహణ",
    welcome: "తిరిగి స్వాగతం",
    search: "రికార్డులను శోధించండి...",
    logout: "లాగ్ అవుట్",
    settings: "సెట్టింగులు",
    profile: "ప్రొఫైల్",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    employees: "কর্মচারী ডাটাবেস",
    attendance: "উপস্থিতি",
    payroll: "পেরোল ম্যানেজমেন্ট",
    welcome: "স্বাগতম",
    search: "রেকর্ড খুঁজুন...",
    logout: "লগআউট",
    settings: "সেটিংস",
    profile: "প্রোফাইল",
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    employees: "कर्मचारी डेटाबेस",
    attendance: "उपस्थिती",
    payroll: "पेरोल व्यवस्थापन",
    welcome: "पुन्हा स्वागत आहे",
    search: "रेकॉर्ड शोधा...",
    logout: "लॉगआउट",
    settings: "सेटिंग्ज",
    profile: "प्रोफाइल",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
