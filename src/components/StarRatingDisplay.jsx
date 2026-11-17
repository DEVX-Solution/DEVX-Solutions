import React from "react";

export function StarRatingDisplay({ rating = 5, size = 15, className = "" }) {
  const numRating = Number(rating) || 5;

  return (
    <div className={`inline-flex items-center gap-1 text-amber-400 select-none ${className}`}>
      {[1, 2, 3, 4, 5].map((starIndex) => {
        let fillPercent = 0;
        if (numRating >= starIndex) {
          fillPercent = 100;
        } else if (numRating === starIndex - 0.5) {
          fillPercent = 50;
        } else if (numRating > starIndex - 1 && numRating < starIndex) {
          fillPercent = Math.round((numRating - (starIndex - 1)) * 100);
        }

        return (
          <div
            key={starIndex}
            className="relative inline-block overflow-hidden"
            style={{ width: size, height: size }}
          >
            {/* 1. Base Star Outline */}
            <svg
              viewBox="0 0 24 24"
              width={size}
              height={size}
              className="text-slate-800"
              fill="currentColor"
              stroke="#334155"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>

            {/* 2. Gold Fill with exact width */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${fillPercent}%` }}
            >
              <svg
                viewBox="0 0 24 24"
                width={size}
                height={size}
                style={{ minWidth: size, width: size, height: size }}
                className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]"
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
        );
      })}
    </div>
  );
}
