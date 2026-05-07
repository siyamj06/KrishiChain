import { useEffect, useState } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";
import ta from "@/locales/ta.json";
import te from "@/locales/te.json";
import kn from "@/locales/kn.json";
import mr from "@/locales/mr.json";

type Language = "en" | "hi" | "ta" | "te" | "kn" | "mr";

const translations: Record<Language, typeof en> = {
  en,
  hi,
  ta,
  te,
  kn,
  mr,
};

const DEFAULT_LANGUAGE: Language = "en";

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or use default
    const stored = localStorage.getItem("lang") as Language | null;
    return stored && stored in translations ? stored : DEFAULT_LANGUAGE;
  });

  // Update the document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Function to get translation by key path (e.g., "landing.empoweringFarmers")
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found in current language
        value = translations.en;
        for (const fallbackK of keys) {
          if (value && typeof value === "object" && fallbackK in value) {
            value = value[fallbackK];
          } else {
            return key; // Return key itself if not found in English
          }
        }
        return value;
      }
    }

    return typeof value === "string" ? value : key;
  };

  // Function to set language
  const setLanguage = (lang: Language) => {
    if (lang in translations) {
      setLanguageState(lang);
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    }
  };

  return {
    language,
    setLanguage,
    t,
    availableLanguages: [
      { code: "en" as Language, label: "English", native: "English" },
      { code: "hi" as Language, label: "Hindi", native: "हिन्दी" },
      { code: "ta" as Language, label: "Tamil", native: "தமிழ்" },
      { code: "te" as Language, label: "Telugu", native: "తెలుగు" },
      { code: "kn" as Language, label: "Kannada", native: "ಕನ್ನಡ" },
      { code: "mr" as Language, label: "Marathi", native: "मराठी" },
    ],
  };
};
