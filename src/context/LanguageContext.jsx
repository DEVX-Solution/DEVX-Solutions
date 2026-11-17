import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, supportedLanguages } from "../i18n/translations";
import { contactInfo } from "../data/siteData";

const LanguageContext = createContext(null);

const STORAGE_KEY = "devx_preferred_lang";

const detectUserLanguage = () => {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;

    const browserLang = (navigator.language || navigator.userLanguage || "pt").toLowerCase();
    if (browserLang.startsWith("es")) return "es";
    if (browserLang.startsWith("en")) return "en";
    if (browserLang.startsWith("pt")) return "pt";
  } catch (e) {
    // fallback
  }
  return "pt";
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectUserLanguage);

  const setLanguage = (langCode) => {
    if (!translations[langCode]) return;
    setLanguageState(langCode);
    try {
      localStorage.setItem(STORAGE_KEY, langCode);
    } catch (e) {}
  };

  // Sync document language attribute and head tags
  useEffect(() => {
    const htmlLang = language === "pt" ? "pt-BR" : language === "es" ? "es" : "en";
    document.documentElement.lang = htmlLang;

    // Dispatch a custom event so non-React scripts or external widgets can react
    window.dispatchEvent(new CustomEvent("devx_language_changed", { detail: { language } }));
  }, [language]);

  const currentStrings = translations[language] || translations.pt;
  const currentLangMeta = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  const getLocalizedWhatsappLink = (subject = "Contato pelo site", details = "") => {
    let msg = "";
    if (language === "en") {
      msg = `Hello! I would like to get in touch with DEVX Solutions regarding ${subject} ${
        details ? `(${details})` : ""
      }. Could you share more details?`;
    } else if (language === "es") {
      msg = `¡Hola! Me gustaría conversar con DEVX Solutions sobre ${subject} ${
        details ? `(${details})` : ""
      }. ¿Podrían brindarme más información?`;
    } else {
      msg = `Olá! Gostaria de conversar com a DEVX Solutions sobre ${subject} ${
        details ? `(${details})` : ""
      }. Pode me passar mais detalhes?`;
    }
    return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const value = {
    language,
    setLanguage,
    supportedLanguages,
    currentLangMeta,
    t: currentStrings,
    getLocalizedWhatsappLink,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
