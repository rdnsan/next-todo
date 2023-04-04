const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          100: '#cce1e3',
          200: '#98cfd6',
          300: '#6fbcc9',
          400: '#4aa8bd',
          500: '#2893b0',
          600: '#0b7ea4',
          700: '#025a7d',
          800: '#003b57',
          900: '#001f30',
        },
      },
    },
  },
  plugins: [],
};
