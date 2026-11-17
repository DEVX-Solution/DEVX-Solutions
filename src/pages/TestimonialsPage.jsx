import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  MessageSquare,
  CheckCircle2,
  X,
  Quote,
  Star,
} from "lucide-react";
import { StarRatingInput } from "../components/StarRatingInput";
import { StarRatingDisplay } from "../components/StarRatingDisplay";
import {
  getApprovedTestimonials,
  addTestimonial,
} from "../utils/storage";
import { useLanguage } from "../context/LanguageContext";

export function TestimonialsPage({ navigate }) {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState(getApprovedTestimonials);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const pageText = t.testimonialsPage || {};

  // Form State
  const [client, setClient] = useState("");
  const [role, setRole] = useState("");
  const [projectType, setProjectType] = useState("Landing Page");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(getApprovedTestimonials());
    };
    window.addEventListener("devx_storage_updated", handleUpdate);
    return () => window.removeEventListener("devx_storage_updated", handleUpdate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!client.trim() || !quote.trim()) return;

    // Envia como pendente de aprovação
    addTestimonial(
      {
        client: client.trim(),
        role: role.trim() || "Cliente DEVX Solutions",
        projectType,
        rating: Number(rating),
        quote: quote.trim(),
        status: "pending",
      },
      false
    );

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
      setClient("");
      setRole("");
      setQuote("");
      setRating(5);
    }, 2800);
  };

  // Apenas as avaliações aprovadas
  const displayTestimonials = testimonials || [];

  // Média dinâmica de avaliações
  const totalRatings = displayTestimonials.reduce(
    (acc, curr) => acc + (Number(curr.rating) || 5),
    0
  );
  const averageRating =
    displayTestimonials.length > 0
      ? (totalRatings / displayTestimonials.length).toFixed(1)
      : "5.0";

  const filteredTestimonials =
    filter === "all"
      ? displayTestimonials
      : displayTestimonials.filter((item) =>
          (item.projectType || "").toLowerCase().includes(filter.toLowerCase())
        );

  const getInitials = (name) => {
    if (!name) return "DX";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* 1. Header Principal */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
            {pageText.tag}
          </span>

          <h1 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            {pageText.titleStart}{" "}
            <span className="text-brand-400">{pageText.titleHighlight}</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            {pageText.sub}
          </p>

          {/* Social Proof em linha com cálculo de média dinâmico e bloom suave */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-slate-800 bg-slate-900/60 px-5 py-2 text-xs text-slate-300">
            <div className="flex items-center text-amber-400 animate-star-bloom-slow">
              <StarRatingDisplay rating={Number(averageRating)} size={15} />
            </div>
            <span className="font-semibold text-white">
              {averageRating} {pageText.avgRatingSuffix || "de avaliação média"}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium">{pageText.satisfiedClients}</span>
            <span className="text-slate-600">•</span>
            <span className="text-brand-300 font-medium">
              {displayTestimonials.length} {pageText.verifiedReviews}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="touch-target inline-flex items-center justify-center rounded-lg bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-950/40 transition hover:bg-brand-500 active:translate-y-0.5"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {pageText.btnAddReview}
            </button>
            <button
              type="button"
              onClick={() => navigate("contato", "/contato")}
              className="touch-target inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-brand-500/60 hover:text-white"
            >
              {t.nav.requestQuote}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Filtros & Grade de Depoimentos */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-brand-400" />
            <h2 className="font-display text-base font-bold text-white sm:text-lg">
              {pageText.verifiedReviews} ({filteredTestimonials.length})
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: pageText.filterAll || "Todos" },
              { id: "landing", label: pageText.filterLanding || "Landing Pages" },
              { id: "institucional", label: pageText.filterInstitucional || "Institucionais" },
              { id: "delivery", label: pageText.filterDelivery || "Delivery / Loja" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`touch-target rounded-lg px-3.5 py-1.5 font-mono text-xs transition ${
                  filter === tab.id
                    ? "bg-brand-600 font-bold text-white shadow-sm"
                    : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Depoimentos */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((item, idx) => (
            <div
              key={item.id || idx}
              className="surface-card relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 border border-slate-800/80 transition-all hover:border-brand-500/40"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/30 to-brand-700/20 text-brand-300 font-mono text-xs font-bold border border-brand-500/30 shadow-inner">
                      {getInitials(item.client)}
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-white leading-tight">
                        {item.client}
                      </h3>
                      <p className="font-mono text-[11px] text-slate-400">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300 shrink-0">
                    <CheckCircle2 size={11} /> {pageText.verifiedBadge || "Verificado"}
                  </span>
                </div>

                {/* Estrelas com suporte a frações/meias estrelas */}
                <div className="mt-4 flex items-center gap-2">
                  <StarRatingDisplay rating={item.rating || 5} size={15} />
                  <span className="font-mono text-xs font-bold text-amber-300">
                    {Number(item.rating || 5).toFixed(1)}
                  </span>
                </div>

                <div className="relative mt-3">
                  <Quote size={20} className="text-brand-500/20 mb-1" />
                  <p className="text-sm leading-relaxed text-slate-200 font-sans italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800/70 pt-4">
                <span className="rounded bg-brand-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-300">
                  {item.projectType || "DEVX Project"}
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {item.date || "DEVX Verified"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Modal para Deixar Depoimento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="surface-card relative w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                DEVX Community
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-white">
                {pageText.modalTitle}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {pageText.modalSub}
              </p>
            </div>

            {formSuccess ? (
              <div className="my-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                <CheckCircle2 size={36} className="mx-auto text-emerald-400" />
                <h4 className="mt-3 font-display text-base font-bold text-emerald-300">
                  {pageText.formSuccess}
                </h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {pageText.formName}
                  </label>
                  <input
                    type="text"
                    required
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Ex: Lucas Ferreira ou Empresa XYZ"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {pageText.formRole}
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Fundador da AlphaTech"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {pageText.formType}
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-xs text-slate-200 focus:border-brand-500 focus:outline-none"
                    >
                      <option value="Landing Page">Landing Page</option>
                      <option value="Site Institucional">Site Institucional</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Plataforma Web">Plataforma Web</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {pageText.formRating}
                    </label>
                    <StarRatingInput
                      value={rating}
                      onChange={setRating}
                      size={24}
                      allowHalf={true}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {pageText.formQuote}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Conte como foi sua experiência, atendimento, velocidade e resultados do projeto..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-sm text-white placeholder:text-slate-600 focus:border-brand-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="touch-target w-full rounded-lg bg-brand-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-950/40 transition hover:bg-brand-500"
                >
                  {pageText.formBtnSubmit}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
