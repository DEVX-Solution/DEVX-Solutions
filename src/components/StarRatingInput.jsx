import React, { useState } from "react";

export function StarRatingInput({
  value = 5,
  onChange,
  size = 32,
  allowHalf = true,
  className = "",
}) {
  const [hoverValue, setHoverValue] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const getLabel = (val) => {
    if (val >= 5.0) return "5.0 - Excepcional / Excelente";
    if (val >= 4.5) return "4.5 - Quase Perfeito";
    if (val >= 4.0) return "4.0 - Muito Bom";
    if (val >= 3.5) return "3.5 - Bom / Acima da Média";
    if (val >= 3.0) return "3.0 - Bom / Satisfeito";
    if (val >= 2.5) return "2.5 - Regular / Mediano";
    if (val >= 2.0) return "2.0 - Abaixo do Esperado";
    if (val >= 1.5) return "1.5 - Ruim";
    if (val >= 1.0) return "1.0 - Muito Ruim";
    return "0.5 - Insatisfatório";
  };

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;

    if (allowHalf && isLeftHalf) {
      setHoverValue(index - 0.5);
    } else {
      setHoverValue(index);
    }
  };

  const handleClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    const selectedVal = allowHalf && isLeftHalf ? index - 0.5 : index;

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    if (onChange) {
      onChange(selectedVal);
    }
  };

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <div
        className="flex items-center gap-2 py-1 select-none"
        onMouseLeave={() => setHoverValue(null)}
      >
        {[1, 2, 3, 4, 5].map((starIndex) => {
          // Calcula a porcentagem precisa de preenchimento (0% a 100%)
          let fillPercent = 0;
          if (displayValue >= starIndex) {
            fillPercent = 100;
          } else if (displayValue === starIndex - 0.5) {
            fillPercent = 50;
          } else if (displayValue > starIndex - 1 && displayValue < starIndex) {
            fillPercent = Math.round((displayValue - (starIndex - 1)) * 100);
          }

          const isHovered =
            hoverValue !== null && displayValue >= starIndex - 0.5;

          return (
            <button
              key={starIndex}
              type="button"
              onMouseMove={(e) => handleMouseMove(e, starIndex)}
              onClick={(e) => handleClick(e, starIndex)}
              className={`group relative cursor-pointer p-0.5 rounded-lg focus:outline-none transition-all duration-200 ease-out ${
                isHovered
                  ? "scale-115 -translate-y-0.5"
                  : "hover:scale-105 active:scale-95"
              } ${isClicked ? "animate-pulse" : ""}`}
              style={{ width: size + 4, height: size + 4 }}
              title={`Selecionar ${starIndex - (displayValue === starIndex - 0.5 ? 0.5 : 0)} estrelas`}
              aria-label={`Avaliar com nota ${displayValue}`}
            >
              <div
                className="relative inline-block overflow-hidden"
                style={{ width: size, height: size }}
              >
                {/* 1. Estrela de Fundo (Vazia / Não preenchida) */}
                <svg
                  viewBox="0 0 24 24"
                  width={size}
                  height={size}
                  className="text-slate-800 transition-colors duration-300 ease-out group-hover:text-slate-700/90"
                  fill="currentColor"
                  stroke="#334155"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>

                {/* 2. Estrela de Preenchimento Suave (Dourada com Transição Suave) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ width: `${fillPercent}%` }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={size}
                    height={size}
                    style={{ minWidth: size, width: size, height: size }}
                    className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.45)] transition-all duration-300"
                    fill="currentColor"
                    stroke="#F59E0B"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            </button>
          );
        })}

        {/* Badge da nota numérica interativo com transição suave */}
        <div className="ml-2.5 flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-amber-600/10 px-3 py-1 shadow-sm backdrop-blur-sm transition-all duration-200">
          <span className="font-mono text-xs font-bold text-amber-300 tracking-wide">
            {displayValue.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Descritor dinâmico e amigável */}
      <div className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400/80 animate-pulse" />
        <span className="text-xs font-medium text-slate-300 transition-opacity duration-200">
          {getLabel(displayValue)}
        </span>
      </div>
    </div>
  );
}
