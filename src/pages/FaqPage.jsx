import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  HelpCircle,
  Search,
  Clock,
  Globe,
  Smartphone,
  CreditCard,
  Headphones,
  FileEdit,
  ArrowRight,
} from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { useLanguage } from "../context/LanguageContext";

const getFaqIcon = (id) => {
  switch (id) {
    case "prazo":
      return Clock;
    case "dominio":
      return Globe;
    case "mobile":
      return Smartphone;
    case "seo":
      return Search;
    case "pagamento":
      return CreditCard;
    case "suporte":
      return Headphones;
    case "atualizacao":
      return FileEdit;
    default:
      return HelpCircle;
  }
};

export function FaqPage({ navigate }) {
  const { t, getLocalizedWhatsappLink } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const pageText = t.faqPage || {};
  const faqs = t.faqs || [];
  const categories = pageText.categories || [
    { id: "all", label: "Todas as Dúvidas" },
    { id: "prazos", label: "Prazos & Domínio" },
    { id: "tecnologia", label: "Tecnologia & SEO" },
    { id: "comercial", label: "Pagamento & Suporte" },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        item.question.toLowerCase().includes(query) ||
        (item.shortAnswer && item.shortAnswer.toLowerCase().includes(query)) ||
        (item.fullAnswer && item.fullAnswer.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-24 sm:pt-32 lg:pt-36 pb-20 space-y-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Header com personalidade de estúdio */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-slate-800/80">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
              {pageText.tag}
            </span>
            <h1 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pageText.titleStart}{" "}
              <span className="text-brand-400">{pageText.titleHighlight}</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">
              {pageText.sub}
            </p>
          </div>

          {/* Campo de Busca Rápida */}
          <div className="w-full lg:w-80">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={pageText.searchPlaceholder || "Pesquisar dúvida..."}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 py-3 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-400 hover:text-white"
                >
                  {pageText.clearSearch || "Limpar"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. Layout de 2 Colunas */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          {/* Coluna Esquerda */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            {/* Filtros de Categoria */}
            <div className="surface-card rounded-2xl p-5 border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                {pageText.categories ? "Categorias" : "Filtrar por Tema"}
              </span>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => {
                  const count =
                    cat.id === "all"
                      ? faqs.length
                      : faqs.filter((f) => f.category === cat.id).length;
                  const isActive = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`touch-target flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                        isActive
                          ? "bg-brand-600 text-white shadow-md shadow-brand-950/40"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card Rápido: Falar no WhatsApp */}
            <div className="surface-card relative overflow-hidden rounded-2xl p-6 border border-brand-500/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <WhatsAppIcon size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">
                    {pageText.cardCtaTitle || "Ainda ficou com alguma dúvida?"}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Direct Support
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-300">
                {pageText.cardCtaSub}
              </p>

              <button
                type="button"
                onClick={() =>
                  openExternal(getLocalizedWhatsappLink("Dúvida Geral / General Inquiries"))
                }
                className="touch-target mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-950/40 transition hover:bg-emerald-500 active:translate-y-0.5"
              >
                <WhatsAppIcon size={16} className="text-white" />
                {pageText.cardCtaBtn || "CHAMAR NO WHATSAPP"}
              </button>
            </div>
          </aside>

          {/* Coluna Direita: Acordeão */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="surface-card rounded-2xl p-10 text-center border border-slate-800">
                <HelpCircle size={36} className="mx-auto text-slate-500" />
                <h3 className="mt-3 font-display text-base font-bold text-white">
                  {pageText.notFound}
                </h3>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-500"
                >
                  {pageText.clearSearch || "Ver todas as dúvidas"}
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const Icon = getFaqIcon(faq.id);

                return (
                  <div
                    key={faq.id || idx}
                    className={`surface-card rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-brand-500/60 shadow-xl shadow-brand-950/40 bg-slate-900/90"
                        : "border-slate-800 hover:border-slate-700 bg-slate-950/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      className="touch-target w-full flex items-start gap-4 p-5 sm:p-6 text-left"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
                          isOpen
                            ? "border-brand-500/40 bg-brand-500/15 text-brand-400"
                            : "border-slate-800 bg-slate-900 text-slate-400"
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-400">
                            {faq.categoryLabel || "FAQ"}
                          </span>
                        </div>
                        <h3 className="mt-1 font-display text-base font-bold text-slate-100 sm:text-lg leading-snug">
                          {faq.question}
                        </h3>
                      </div>

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 border-brand-500/40 bg-brand-500/10 text-brand-400"
                            : "border-slate-800 bg-slate-900/60 text-slate-400"
                        }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-800/60 animate-fadeIn">
                        <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800/80">
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre-line font-sans">
                            {faq.fullAnswer}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                          <span className="text-[11px] text-slate-400">
                            {pageText.cardCtaTitle}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              openExternal(
                                getLocalizedWhatsappLink(
                                  "Dúvida / Question: " + faq.question
                                )
                              )
                            }
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
                          >
                            <WhatsAppIcon size={14} className="text-emerald-400" />
                            <span>WhatsApp Support</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 3. Rodapé de Apoio */}
        <div className="mt-16 surface-card rounded-2xl p-8 sm:p-12 border border-brand-500/30 text-center">
          <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
            {t.home.bannerTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
            {t.home.bannerSub}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate("contato", "/contato")}
              className="touch-target inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-950/40 hover:bg-brand-500 transition"
            >
              {t.nav.requestQuote} <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigate("portfolio", "/portfolio")}
              className="touch-target inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-bold text-slate-300 hover:border-slate-500 hover:text-white transition"
            >
              {t.nav.portfolio}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
