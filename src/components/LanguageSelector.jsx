import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSelector({ variant = "default", className = "" }) {
  const { language, setLanguage, supportedLanguages, currentLangMeta } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // Se for variante simples para o Footer
  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/80 p-1 text-xs ${className}`}>
        {supportedLanguages.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-all ${
                isActive
                  ? "bg-brand-600 font-bold text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <span className="text-sm">{item.flag}</span>
              <span className="font-mono text-[11px] uppercase tracking-wider">{item.short}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Variante Dropdown Limpa com Bandeira + Sigla + Seta
  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="touch-target group flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition-all hover:border-brand-500/50 hover:bg-slate-800/80 hover:text-white"
        title="Alterar idioma / Change language"
      >
        <span className="text-base leading-none">{currentLangMeta.flag}</span>
        <span className="font-mono uppercase tracking-wider text-slate-200">{currentLangMeta.short}</span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-400" : ""}`}
        />
      </button>

      {/* Menu Dropdown Flutuante */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-slate-800 bg-[#0C111D]/95 p-1.5 shadow-2xl backdrop-blur-xl ring-1 ring-black/40 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="space-y-1">
            {supportedLanguages.map((item) => {
              const isActive = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                    isActive
                      ? "bg-brand-500/15 font-bold text-brand-300 border border-brand-500/30"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span>{item.label}</span>
                  </div>
                  {isActive && <Check size={14} className="text-brand-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
