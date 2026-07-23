/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "rgba(30, 41, 59, 0.7)",
        border: "rgba(255, 255, 255, 0.1)",
        accent: "#38bdf8",
        'accent-glow': "rgba(56, 189, 248, 0.3)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
