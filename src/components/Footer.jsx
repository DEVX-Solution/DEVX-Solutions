import React, { useState, useEffect } from "react";
import { Code2, Mail, MapPin, Instagram, Linkedin, Github, Lock } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { getStoredContactInfo } from "../utils/storage";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import logoImg from "../assets/IMAGOTIPO_-_Darkmode_v1.png";

export function Footer({ navigate }) {
  const [contact, setContact] = useState(getStoredContactInfo);
  const { t, getLocalizedWhatsappLink } = useLanguage();

  useEffect(() => {
    const handleSync = () => {
      setContact(getStoredContactInfo());
    };
    window.addEventListener("devx_storage_updated", handleSync);
    return () => window.removeEventListener("devx_storage_updated", handleSync);
  }, []);

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/70 pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pb-12 border-b border-slate-800/80">
          {/* Coluna 1: Marca & Propósito */}
          <div>
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="DEVX Solutions"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400 sm:text-sm">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex gap-3 text-slate-400">
              <button
                type="button"
                aria-label="WhatsApp"
                onClick={() => openExternal(getLocalizedWhatsappLink("Projeto Digital"))}
                className="touch-target flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-brand-500/50 hover:text-brand-300"
              >
                <WhatsAppIcon size={18} />
              </button>
              <button
                type="button"
                aria-label="Instagram"
                onClick={() => openExternal(contact.instagramUrl)}
                className="touch-target flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-brand-500/50 hover:text-brand-300"
              >
                <Instagram size={18} />
              </button>
              <button
                type="button"
                aria-label="LinkedIn"
                onClick={() => openExternal(contact.linkedinUrl)}
                className="touch-target flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-brand-500/50 hover:text-brand-300"
              >
                <Linkedin size={18} />
              </button>
              <button
                type="button"
                aria-label="GitHub"
                onClick={() => openExternal(contact.githubUrl)}
                className="touch-target flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-brand-500/50 hover:text-brand-300"
              >
                <Github size={18} />
              </button>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.footer.navTitle}
            </h4>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigate("home", "/")}
                  className="hover:text-brand-300 transition-colors text-left"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("portfolio", "/portfolio")}
                  className="hover:text-brand-300 transition-colors text-left"
                >
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("servicos", "/servicos")}
                  className="hover:text-brand-300 transition-colors text-left"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("depoimentos", "/depoimentos")}
                  className="hover:text-brand-300 transition-colors text-left"
                >
                  {t.nav.testimonials}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("duvidas", "/duvidas")}
                  className="hover:text-brand-300 transition-colors text-left"
                >
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate("contato", "/contato")}
                  className="hover:text-brand-300 transition-colors text-left"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Especialidades */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.footer.servicesTitle}
            </h4>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-400">
              {t.footer.servicesList.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato & Idioma */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.footer.contactTitle}
            </h4>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => openExternal(getLocalizedWhatsappLink("Projeto"))}
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-300 transition-colors text-left"
                >
                  <WhatsAppIcon size={15} className="text-slate-400 shrink-0" />
                  <span>{contact.whatsappFormatted}</span>
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-slate-400 shrink-0" />
                <button
                  type="button"
                  onClick={() => openExternal(`mailto:${contact.email}`)}
                  className="hover:text-brand-300 transition-colors break-all text-left"
                >
                  {contact.email}
                </button>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-slate-400 shrink-0" />
                <span>{contact.location}</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <span className="block text-[11px] font-mono text-slate-400 mb-2">
                {t.nav.langSelect}:
              </span>
              <LanguageSelector variant="footer" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-4">
            <span>{t.footer.privacy}</span>
            <span>{t.footer.terms}</span>
            <button
              type="button"
              onClick={() => navigate("admin", "/admin")}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-brand-400 transition"
              title="Acesso Administrativo"
            >
              <Lock size={12} /> {t.footer.admin}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
