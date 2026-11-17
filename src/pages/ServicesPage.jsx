import React from "react";
import {
  Check,
  LayoutTemplate,
  Building2,
  ShoppingCart,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function ServicesPage() {
  const { t, getLocalizedWhatsappLink } = useLanguage();

  const pageText = t.servicesPage || {};
  const budgets = t.budgets || [];
  const processSteps = t.processSteps || [];

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-24 sm:pt-32 lg:pt-36 pb-20 space-y-20">
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

        {/* Grade dos 3 Planos */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((b) => {
            const Icon =
              b.id === "landing"
                ? LayoutTemplate
                : b.id === "institucional"
                ? Building2
                : ShoppingCart;

            return (
              <div
                key={b.id}
                className={`surface-card surface-card-interactive relative flex flex-col justify-between rounded-2xl p-7 sm:p-8 ${
                  b.popular
                    ? "border-brand-500/80 shadow-xl shadow-brand-950/50 ring-1 ring-brand-500/40"
                    : ""
                }`}
              >
                {b.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-600 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    {pageText.mostPopular}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                      {b.name}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-400">
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="text-xs font-semibold text-slate-400">
                      {b.label}
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-bold text-slate-100">
                      {b.name}
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm">
                      {b.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1 font-mono text-[11px] text-slate-300 border border-slate-800">
                      {pageText.avgDelivery}{" "}
                      <span className="text-brand-300 font-semibold">{b.prazoMedio}</span>
                    </div>
                  </div>

                  <div className="mt-7 border-t border-slate-800/80 pt-6">
                    <span className="font-mono text-xs font-semibold text-slate-300">
                      {pageText.includedFeatures}
                    </span>
                    <ul className="mt-3 space-y-2.5">
                      {b.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs text-slate-300"
                        >
                          <Check size={15} className="mt-0.5 shrink-0 text-brand-400" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => openExternal(getLocalizedWhatsappLink(b.name, b.label))}
                    className={`touch-target w-full rounded-lg px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wider transition ${
                      b.popular
                        ? "bg-brand-600 text-white shadow-lg shadow-brand-950/40 hover:bg-brand-500 active:translate-y-0.5"
                        : "border border-slate-700 bg-slate-900/80 text-slate-200 hover:border-brand-500/60 hover:text-white"
                    }`}
                  >
                    {pageText.choosePlan}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Processo / Metodologia */}
        {processSteps.length > 0 && (
          <div className="mt-20">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
                {pageText.processTag}
              </span>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-4xl">
                {pageText.processTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {pageText.processSub}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="surface-card rounded-xl p-6 border border-slate-800/80"
                >
                  <span className="font-mono text-2xl font-black text-brand-400">
                    {step.step}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
