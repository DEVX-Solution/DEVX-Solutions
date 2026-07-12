/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 50px rgba(111, 66, 255, .28)",
        blueglow: "0 0 40px rgba(39, 111, 255, .22)",
      },
    },
  },
  plugins: [],
};
