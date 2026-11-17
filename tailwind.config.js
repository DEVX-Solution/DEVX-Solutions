/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        obsidian: {
          DEFAULT: "#090D16",
          50: "#1E273A",
          100: "#151D2D",
          200: "#0F1523",
          300: "#090D16",
        },
        surface: {
          card: "rgba(18, 24, 38, 0.72)",
          cardHover: "rgba(23, 31, 48, 0.88)",
          elevated: "#151C2C",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(99, 102, 241, 0.4)",
        },
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8", // Roxo azulado para textos, badges e bordas
          500: "#6366F1", // Roxo azulado principal da DEVX
          600: "#4F46E5", // Roxo azulado vibrante para botões
          700: "#4338CA",
          glow: "#6F42FF",
        },
        emeraldSignal: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07)",
        cardHover: "0 18px 40px -12px rgba(99, 102, 241, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        brandGlow: "0 0 35px -5px rgba(99, 102, 241, 0.38)",
      },
    },
  },
  plugins: [],
};
