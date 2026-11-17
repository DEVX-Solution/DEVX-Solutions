import React from "react";
import { Zap, Smartphone, Target, Pin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useLanguage } from "../context/LanguageContext";

export function PostItNotes() {
  const { t } = useLanguage();
  const rawNotes = t.postItNotes || [];

  const noteStyles = [
    {
      icon: Zap,
      bg: "bg-[#FEF08A]", // Amarelo canário clássico
      text: "text-amber-950",
      accent: "text-amber-800",
      border: "border-amber-300/60",
      tape: "bg-amber-100/60 border-amber-200/60",
      rotation: "-rotate-2 hover:rotate-0",
      pinColor: "text-amber-600",
    },
    {
      icon: Smartphone,
      bg: "bg-[#DDD6FE]", // Lavanda moderno
      text: "text-purple-950",
      accent: "text-purple-800",
      border: "border-purple-300/60",
      tape: "bg-purple-100/60 border-purple-200/60",
      rotation: "rotate-1 hover:rotate-0",
      pinColor: "text-purple-600",
    },
    {
      icon: Target,
      bg: "bg-[#A7F3D0]", // Menta suave
      text: "text-emerald-950",
      accent: "text-emerald-800",
      border: "border-emerald-300/60",
      tape: "bg-emerald-100/60 border-emerald-200/60",
      rotation: "-rotate-1 hover:rotate-0",
      pinColor: "text-emerald-600",
    },
    {
      icon: WhatsAppIcon,
      bg: "bg-[#FED7AA]", // Pêssego / Coral suave
      text: "text-orange-950",
      accent: "text-orange-800",
      border: "border-orange-300/60",
      tape: "bg-orange-100/60 border-orange-200/60",
      rotation: "rotate-2 hover:rotate-0",
      pinColor: "text-orange-600",
    },
  ];

  return (
    <div className="relative">
      {/* Background Board effect */}
      <div className="relative mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-4 pb-2">
        {rawNotes.map((note, index) => {
          const style = noteStyles[index % noteStyles.length];
          const Icon = style.icon;

          return (
            <div
              key={note.id || index}
              className={`relative transform rounded-sm p-6 shadow-xl transition-all duration-300 ease-out hover:scale-105 hover:z-20 ${style.bg} ${style.text} ${style.rotation} border ${style.border}`}
              style={{
                boxShadow:
                  "0 15px 30px -5px rgba(0, 0, 0, 0.45), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Frosted Tape at top */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 rounded-xs backdrop-blur-xs border shadow-xs ${style.tape}`}
                style={{ transform: "translateX(-50%) rotate(-1deg)" }}
              />

              {/* Header with Pin & Tag */}
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider opacity-75">
                  <Pin size={13} className={style.pinColor} />
                  <span>{note.badge || `Dica DEVX #${note.number}`}</span>
                </div>
                <span className="rounded-full bg-black/10 px-2 py-0.5 font-mono text-[10px] font-bold tracking-tight">
                  {note.tag}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="mt-4 flex items-start gap-2.5">
                <div className="mt-0.5 rounded-md bg-black/10 p-1.5">
                  <Icon size={18} className={style.accent} />
                </div>
                <h4 className="font-display text-base font-extrabold leading-snug">
                  {note.title}
                </h4>
              </div>

              {/* Content text */}
              <p className="mt-3 text-xs leading-relaxed font-sans font-medium opacity-90">
                {note.content}
              </p>

              {/* Takeaway note badge */}
              <div className="mt-5 rounded-md bg-black/10 px-3 py-2 text-[11px] font-bold leading-tight">
                {note.takeaway}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
