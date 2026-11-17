import React, { useState, useEffect } from "react";
import {
  Mail,
  Instagram,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { getStoredContactInfo } from "../utils/storage";
import { useLanguage } from "../context/LanguageContext";

export function ContactPage() {
  const { t, language } = useLanguage();
  const [contact, setContact] = useState(getStoredContactInfo);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    projectType: "Landing Page",
    message: "",
  });

  const pageText = t.contactPage || {};

  useEffect(() => {
    const handleSync = () => {
      setContact(getStoredContactInfo());
    };
    window.addEventListener("devx_storage_updated", handleSync);
    return () => window.removeEventListener("devx_storage_updated", handleSync);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSendWhatsapp = (e) => {
    e.preventDefault();
    let text = "";
    if (language === "en") {
      text = `Hello DEVX Solutions! My name is ${formData.name || "Client"}.
Contact: ${formData.contact || "Not provided"}
Project category: ${formData.projectType}
Details: ${formData.message || "I would like to request a proposal."}`;
    } else if (language === "es") {
      text = `¡Hola DEVX Solutions! Me llamo ${formData.name || "Cliente"}.
Contacto: ${formData.contact || "No informado"}
Tipo de proyecto: ${formData.projectType}
Detalles: ${formData.message || "Me gustaría solicitar una cotización."}`;
    } else {
      text = `Olá, DEVX Solutions! Me chamo ${formData.name || "Cliente"}.
Contato: ${formData.contact || "Não informado"}
Tipo de projeto: ${formData.projectType}
Detalhes: ${formData.message || "Gostaria de solicitar um orçamento."}`;
    }

    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    openExternal(url);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = `DEVX Project Brief: ${formData.projectType} - ${formData.name || "Client"}`;
    const body = `Name: ${formData.name || ""}%0D%0AContact: ${formData.contact || ""}%0D%0AProject: ${formData.projectType}%0D%0AMessage:%0D%0A${formData.message || ""}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div className="pt-24 sm:pt-32 lg:pt-36 pb-20 space-y-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
            {pageText.tag}
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {pageText.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            {pageText.sub}
          </p>
        </div>

        {/* Grade de Contato */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          {/* Canais Diretos */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {pageText.channelsTag}
            </span>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={() => {
                const msg = language === "en"
                  ? "Hello! I would like to chat with DEVX Solutions regarding a new project."
                  : language === "es"
                  ? "¡Hola! Me gustaría hablar con DEVX Solutions sobre un nuevo proyecto."
                  : "Olá! Gostaria de conversar com a DEVX Solutions sobre um projeto. Pode me passar mais detalhes?";
                openExternal(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`);
              }}
              className="touch-target group flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-5 text-left transition hover:border-emerald-500/60 hover:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition group-hover:scale-105">
                <WhatsAppIcon size={24} className="text-emerald-400" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  WhatsApp
                </span>
                <h3 className="mt-0.5 truncate font-display text-lg font-bold text-slate-100 sm:text-xl">
                  {contact.whatsappFormatted}
                </h3>
                <span className="text-xs text-slate-400">
                  {pageText.whatsappSub}
                </span>
              </div>
              <ArrowRight className="hidden h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-emerald-400 sm:block" />
            </button>

            {/* Email */}
            <button
              type="button"
              onClick={() => openExternal(`mailto:${contact.email}?subject=Project Quote DEVX Solutions`)}
              className="touch-target group flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-5 text-left transition hover:border-brand-500/60 hover:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-400 transition group-hover:scale-105">
                <Mail size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  E-mail
                </span>
                <h3 className="mt-0.5 break-words font-display text-base font-bold text-slate-100 sm:text-lg">
                  {contact.email}
                </h3>
                <span className="text-xs text-slate-400">
                  {pageText.emailSub}
                </span>
              </div>
              <ArrowRight className="hidden h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-brand-400 sm:block" />
            </button>

            {/* Instagram */}
            <button
              type="button"
              onClick={() => openExternal(contact.instagramUrl)}
              className="touch-target group flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-5 text-left transition hover:border-rose-500/60 hover:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 transition group-hover:scale-105">
                <Instagram size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Instagram
                </span>
                <h3 className="mt-0.5 truncate font-display text-lg font-bold text-slate-100 sm:text-xl">
                  {contact.instagramHandle}
                </h3>
                <span className="text-xs text-slate-400">
                  {pageText.instagramSub}
                </span>
              </div>
              <ArrowRight className="hidden h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-rose-400 sm:block" />
            </button>

            {/* Localização */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                  DEVX Headquarters & Global Reach
                </span>
                <p className="text-sm font-semibold text-slate-200">
                  {contact.location} — {pageText.locationSub}
                </p>
              </div>
            </div>
          </div>

          {/* Formulário Interativo de Briefing */}
          <div className="surface-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              {pageText.formTag}
            </span>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-100 sm:text-2xl">
              {pageText.formTitle}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {pageText.formSub}
            </p>

            <form className="mt-6 space-y-4">
              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5">
                  {pageText.formNameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={pageText.formNamePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5">
                  {pageText.formContactLabel}
                </label>
                <input
                  type="text"
                  name="contact"
                  required
                  placeholder={pageText.formContactPlaceholder}
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5">
                  {pageText.formProjectTypeLabel}
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 focus:border-brand-500 focus:outline-none"
                >
                  <option value="Landing Page">Landing Page</option>
                  <option value="Site Institucional">Corporate / Brand Website</option>
                  <option value="E-Commerce / Loja">E-Commerce & Digital Store</option>
                  <option value="Manutenção ou Redesign">Website Redesign / SEO Performance</option>
                  <option value="Outro">Custom Software / Other</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 mb-1.5">
                  {pageText.formMessageLabel}
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder={pageText.formMessagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleSendWhatsapp}
                  className="touch-target flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-950/40 transition hover:bg-emerald-500 active:translate-y-0.5"
                >
                  <WhatsAppIcon size={16} className="text-white" />
                  {pageText.btnSendWhatsapp}
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="touch-target flex items-center justify-center gap-2 rounded-lg border border-brand-500/60 bg-brand-600/20 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-300 transition hover:bg-brand-600 hover:text-white active:translate-y-0.5"
                >
                  <Mail size={16} />
                  {pageText.btnSendEmail}
                </button>
              </div>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                {pageText.trustText}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
