/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gov: {
          background: '#F4F6F0',
          green: {
            primary: '#2D6A4F',
            secondary: '#40916C',
            light: '#D8F3DC',
            dark: '#1B4332',
          },
          text: {
            primary: '#1A1A1A',
            secondary: '#4A5568',
          },
          border: '#B7D5C4',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        tiro: ['"Tiro Devanagari Hindi"', 'serif'],
        baskerville: ['"Libre Baskerville"', 'serif'],
        noto: ['"Noto Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
