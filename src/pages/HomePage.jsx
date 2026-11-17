import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check,
} from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { HeroShowcase } from "../components/HeroShowcase";
import { PostItNotes } from "../components/PostItNotes";
import { getStoredContactInfo, getStoredProjects } from "../utils/storage";
import { useLanguage } from "../context/LanguageContext";

export function HomePage({ navigate }) {
  const { t, getLocalizedWhatsappLink } = useLanguage();
  const [contact, setContact] = useState(getStoredContactInfo);
  const [storedProjects, setStoredProjects] = useState(getStoredProjects);

  useEffect(() => {
    const handleSync = () => {
      setContact(getStoredContactInfo());
      setStoredProjects(getStoredProjects());
    };
    window.addEventListener("devx_storage_updated", handleSync);
    return () => window.removeEventListener("devx_storage_updated", handleSync);
  }, []);

  const projects = useMemo(() => {
    const transProjects = t.projects || [];
    return (storedProjects || []).map((sp) => {
      const trans = transProjects.find((tp) => tp.id === sp.id);
      return trans ? { ...trans, ...sp } : sp;
    });
  }, [storedProjects, t.projects]);

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-20 sm:space-y-28 lg:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* Texto de Abertura */}
            <div className="flex flex-col items-start text-left">
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
                {t.hero.titleStart}{" "}
                <span className="text-brand-400">{t.hero.titleHighlight}</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {t.hero.subtitle}
              </p>

              {/* Botões de Ação */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  type="button"
                  onClick={() => navigate("contato", "/contato")}
                  className="touch-target inline-flex items-center justify-center rounded-lg bg-brand-600 px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand-950/40 transition hover:bg-brand-500 active:translate-y-0.5 sm:w-auto"
                >
                  {t.hero.btnQuote}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("portfolio", "/portfolio")}
                  className="touch-target inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-sm font-bold tracking-wide text-slate-200 transition hover:border-brand-500/60 hover:bg-brand-950/30 hover:text-white sm:w-auto"
                >
                  {t.hero.btnPortfolio}
                </button>
              </div>

              {/* Diferenciais em linha */}
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-brand-400" />
                  <span>{t.hero.diff1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-brand-400" />
                  <span>{t.hero.diff2}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-brand-400" />
                  <span>{t.hero.diff3}</span>
                </div>
              </div>
            </div>

            {/* Showcase Interativo */}
            <div className="w-full">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROJETOS EM DESTAQUE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
              {t.home.portfolioTag}
            </span>
            <h2 className="mt-1 font-display text-2xl font-black text-white sm:text-3xl">
              {t.home.portfolioTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {t.home.portfolioSub}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("portfolio", "/portfolio")}
            className="touch-target inline-flex items-center gap-1 text-sm font-bold text-brand-400 hover:text-brand-300 transition"
          >
            {t.home.seeFullGallery} <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="surface-card group flex flex-col overflow-hidden rounded-xl border border-slate-800/80 transition hover:border-brand-500/40"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3 right-3 rounded-full border border-slate-700 bg-slate-950/85 px-2.5 py-0.5 font-mono text-[10px] text-brand-300">
                  {p.resultMetric}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-white group-hover:text-brand-300 transition">
                      {p.title}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-400">
                      {p.category}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {p.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(p.tags) ? p.tags : []).map((tagItem) => (
                      <span
                        key={tagItem}
                        className="rounded border border-slate-800 bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                      >
                        {tagItem}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => openExternal(p.link)}
                    className="touch-target inline-flex items-center gap-1 font-mono text-xs font-semibold text-brand-400 hover:text-brand-300"
                  >
                    {t.home.seeLive} <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DICAS EM POST-ITS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            {t.home.postItTag}
          </span>

          <h2 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl lg:text-4xl">
            {t.home.postItTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {t.home.postItSub}
          </p>
        </div>

        {/* Post-it Notes */}
        <PostItNotes />

        {/* Link para Depoimentos */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => navigate("depoimentos", "/depoimentos")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-300 transition"
          >
            <span>{t.home.postItCtaPrompt} </span>
            <span className="text-brand-400 underline underline-offset-4">{t.home.postItCtaLink}</span>
            <ChevronRight size={14} className="text-brand-400" />
          </button>
        </div>
      </section>

      {/* 4. BANNER FINAL DIRETO & CLEAN */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="surface-card relative overflow-hidden rounded-2xl p-8 sm:p-12 border border-brand-500/30 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              {t.home.bannerTag}
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
              {t.home.bannerTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {t.home.bannerSub}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate("contato", "/contato")}
                className="touch-target inline-flex items-center justify-center rounded-lg bg-brand-600 px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand-950/40 transition hover:bg-brand-500 active:translate-y-0.5"
              >
                {t.home.bannerBtnQuote}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  openExternal(getLocalizedWhatsappLink("Novo Projeto"));
                }}
                className="touch-target inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-bold tracking-wide text-slate-200 transition hover:border-emerald-500/50 hover:text-white"
              >
                <WhatsAppIcon size={18} className="text-emerald-400" /> {t.home.bannerBtnWhatsapp}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
