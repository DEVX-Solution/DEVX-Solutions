import React from "react";
import { useLanguage } from "../context/LanguageContext";

export function ProjectBadge({ status, className = "", size = "md" }) {
  let language = "pt";
  try {
    const langContext = useLanguage();
    if (langContext && langContext.language) {
      language = langContext.language;
    }
  } catch (e) {
    // fallback if used outside LanguageProvider
  }

  const rawStatus = (status || "").trim();
  const normalized = rawStatus.toLowerCase();

  const isReal =
    normalized === "projeto real" ||
    normalized === "real project" ||
    normalized === "proyecto real" ||
    normalized === "real" ||
    normalized.includes("real");

  const isDemo =
    normalized === "demonstração" ||
    normalized === "demonstracao" ||
    normalized === "demostración" ||
    normalized === "demostracion" ||
    normalized === "demo" ||
    normalized.includes("demo");

  const isDev =
    normalized.includes("desenvolvimento") ||
    normalized.includes("development") ||
    normalized.includes("desarrollo") ||
    normalized.includes("em breve");

  let label = rawStatus || "Demonstração";
  let config;

  if (isReal) {
    label =
      language === "en"
        ? "Real Project"
        : language === "es"
        ? "Proyecto Real"
        : "Projeto Real";
    config = {
      badgeClass:
        "border-emerald-500/40 bg-slate-950/85 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.22)] hover:border-emerald-400/70",
      dotClass: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.95)]",
      ping: true,
      pingClass: "bg-emerald-400",
    };
  } else if (isDemo) {
    label =
      language === "en"
        ? "Demonstration"
        : language === "es"
        ? "Demostración"
        : "Demonstração";
    config = {
      badgeClass:
        "border-amber-500/40 bg-slate-950/85 text-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.22)] hover:border-amber-400/70",
      dotClass: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.95)]",
      ping: false,
    };
  } else if (isDev) {
    label =
      language === "en"
        ? "In Development"
        : language === "es"
        ? "En Desarrollo"
        : "Em Desenvolvimento";
    config = {
      badgeClass:
        "border-cyan-500/40 bg-slate-950/85 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.22)] hover:border-cyan-400/70",
      dotClass: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.95)]",
      ping: true,
      pingClass: "bg-cyan-400",
    };
  } else {
    // If it's a legacy metric or custom text
    config = {
      badgeClass:
        "border-slate-700/80 bg-slate-950/85 text-slate-200 shadow-sm hover:border-slate-600",
      dotClass: "bg-brand-400 shadow-[0_0_6px_rgba(129,140,248,0.85)]",
      ping: false,
    };
  }

  const paddingClass =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-semibold tracking-wide backdrop-blur-md transition-all ${config.badgeClass} ${paddingClass} ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
        {config.ping && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${config.pingClass}`}
          />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${config.dotClass}`}
        />
      </span>
      <span>{label}</span>
    </span>
  );
}
