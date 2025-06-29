/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ IMPORTANT
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
