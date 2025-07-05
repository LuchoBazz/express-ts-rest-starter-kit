/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff3ff",
          100: "#dce5fd",
          200: "#c1d1fc",
          300: "#96b5fa",
          400: "#5180f5",
          500: "#4066f1",
          600: "#2a47e6",
          700: "#2233d3",
          800: "#222cab",
          900: "#212b87",
          950: "#191d52",
        },
      },
    },
  },
  plugins: [],
};
