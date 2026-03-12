/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: '#001f3f',
        orange: '#ff851b',
      },
    },
  },
  plugins: [],
};