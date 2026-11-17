import React, { useState } from "react";
import { Code2, Menu, X, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import logoImg from "../assets/IMAGOTIPO_-_Darkmode_v1.png";

export function Navbar({ currentPage, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { id: "home", label: t.nav.home, path: "/" },
    { id: "portfolio", label: t.nav.portfolio, path: "/portfolio" },
    { id: "servicos", label: t.nav.services, path: "/servicos" },
    { id: "depoimentos", label: t.nav.testimonials, path: "/depoimentos" },
    { id: "duvidas", label: t.nav.faq, path: "/duvidas" },
    { id: "contato", label: t.nav.contact, path: "/contato" },
  ];

  const handleNavClick = (pageId, path) => {
    navigate(pageId, path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("home", "/")}
          className="group flex items-center touch-target text-left focus:outline-none"
        >
          <img
            src={logoImg}
            alt="DEVX Solutions"
            className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        {/* Desktop Navigation */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id, item.path)}
                className={`touch-target rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-500/10 font-bold text-brand-400"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Mobile Toggle & Language Selector */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Seletor de Idioma no Desktop */}
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>

          <button
            type="button"
            onClick={() => handleNavClick("contato", "/contato")}
            className="hidden touch-target items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold tracking-wide text-slate-200 transition hover:border-brand-500/60 hover:bg-brand-950/40 hover:text-white sm:inline-flex md:text-sm"
          >
            {t.nav.quoteCta}
          </button>

          {/* Seletor compacto no mobile caso a tela seja bem pequena */}
          <div className="sm:hidden">
            <LanguageSelector />
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="touch-target grid h-10 w-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 transition hover:border-slate-700 hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-[#0C111D]/95 px-4 pb-6 pt-3 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id, item.path)}
                  className={`touch-target rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-500/10 font-bold text-brand-400"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-3">
              <button
                type="button"
                onClick={() => handleNavClick("contato", "/contato")}
                className="touch-target flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-950/40 transition active:translate-y-0.5 hover:bg-brand-500"
              >
                {t.nav.requestQuote} <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
