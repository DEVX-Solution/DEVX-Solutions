import React, { useState, useEffect, useMemo } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getStoredProjects } from "../utils/storage";

export function PortfolioPage({ navigate }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [storedProjects, setStoredProjects] = useState(getStoredProjects);

  useEffect(() => {
    const handleSync = () => {
      setStoredProjects(getStoredProjects());
    };
    window.addEventListener("devx_storage_updated", handleSync);
    return () => window.removeEventListener("devx_storage_updated", handleSync);
  }, []);

  const pageText = t.portfolioPage || {};
  const categories = pageText.categories || [
    { id: "all", label: "Todos os Projetos" },
    { id: "landing", label: "Landing Pages" },
    { id: "institucional", label: "Sites Institucionais" },
    { id: "delivery", label: "Delivery & E-Commerce" },
  ];

  const projects = useMemo(() => {
    const transProjects = t.projects || [];
    return (storedProjects || []).map((sp) => {
      const trans = transProjects.find((tp) => tp.id === sp.id);
      return trans ? { ...trans, ...sp } : sp;
    });
  }, [storedProjects, t.projects]);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => (p.categoryFilter || "").toLowerCase() === filter.toLowerCase());

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-24 sm:pt-32 lg:pt-36 pb-20 space-y-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header da Página */}
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

        {/* Barra de Filtros */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-slate-800 pb-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`touch-target rounded-lg px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                filter === cat.id
                  ? "bg-brand-600 text-white shadow-md shadow-brand-950/40"
                  : "border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grade de Projetos com Detalhes */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <article
              key={p.id}
              className="surface-card surface-card-interactive group flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={p.img}
                  alt={`Screenshot do projeto ${p.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute top-3.5 right-3.5 rounded-full border border-slate-700 bg-slate-950/90 px-3 py-1 font-mono text-[11px] font-semibold text-brand-300 backdrop-blur-sm">
                  {p.resultMetric}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-brand-400">
                      {p.category}
                    </span>
                    <span className="text-[11px] text-slate-400">DEVX Studio</span>
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-bold text-slate-100 group-hover:text-brand-300 transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {p.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-800/80 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(p.tags)
                        ? p.tags
                        : typeof p.tags === "string"
                        ? p.tags.split(",").map((s) => s.trim()).filter(Boolean)
                        : []
                      ).map((tagItem) => (
                        <span
                          key={tagItem}
                          className="rounded border border-slate-800 bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                        >
                          {tagItem}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => openExternal(p.link)}
                      className="touch-target inline-flex items-center gap-1.5 font-mono text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      {pageText.visitProject || "Acessar"} <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Banner de Chamada para Novo Projeto */}
        <div className="mt-20 surface-card rounded-2xl p-8 sm:p-12 border border-brand-500/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-extrabold text-white">
              {pageText.ctaTitle}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {pageText.ctaSub}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("contato", "/contato")}
            className="touch-target shrink-0 inline-flex items-center justify-center rounded-lg bg-brand-600 px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand-950/40 transition hover:bg-brand-500"
          >
            {pageText.ctaButton} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}