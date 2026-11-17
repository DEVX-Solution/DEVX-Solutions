import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export function HeroShowcase() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRealGif, setIsRealGif] = useState(false);

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    // Se o GIF tiver mais de 10x10 px, significa que o usuário colocou o arquivo real
    if (e.target.naturalWidth > 10 && e.target.naturalHeight > 10) {
      setIsRealGif(true);
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border border-slate-800/90 bg-slate-950/80 shadow-2xl backdrop-blur-md">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/70 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <a
            href="https://jbgpecas.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Acessar https://jbgpecas.com/"
            className="flex items-center rounded-md border border-slate-800 bg-slate-950/60 px-3 py-1 font-mono text-[11px] text-slate-300 hover:text-brand-300 hover:border-slate-700 transition"
          >
            https://jbgpecas.com/
          </a>
          <div className="w-10" />
        </div>

        {/* Browser Content - Enquadramento direto no site, removendo o mockup de notebook */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
          {/* Skeleton enquanto faz o carregamento assíncrono do arquivo */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950 p-6 text-center z-10">
              <div className="h-8 w-8 rounded-full border-2 border-brand-500/30 border-t-brand-400 animate-spin" />
              <span className="font-mono text-xs text-slate-400">
                Carregando demonstração interativa...
              </span>
            </div>
          )}

          {/* Placeholder elegante e informativo caso o GIF real ainda não tenha sido colado */}
          {isLoaded && !isRealGif && (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400 shadow-inner">
                <Sparkles size={26} />
              </div>
              <h4 className="font-display text-base font-bold text-white">
                Demonstração DEVX Solutions
              </h4>
              <p className="max-w-xs font-mono text-xs text-slate-400 leading-relaxed">
                Coloque o arquivo{" "}
                <code className="text-brand-300 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  hero.gif
                </code>{" "}
                dentro da pasta{" "}
                <code className="text-slate-200 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  public/
                </code>
              </p>
            </div>
          )}

          {/* Tag do GIF com enquadramento preciso focado 100% no site e exibindo o cabeçalho */}
          <img
            src="/hero.gif"
            alt="Demonstração DEVX Solutions"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={handleImageLoad}
            className={`h-full w-full object-cover scale-[1.46] translate-y-[5.5%] transition-opacity duration-700 ${
              isRealGif ? "opacity-100" : "opacity-0 absolute pointer-events-none"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
