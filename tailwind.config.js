/** @type {import('tailwindcss').Config} */
const textshadow = require('tailwindcss-textshadow');
const typography = require('@tailwindcss/typography')

module.exports = {
  darkMode: 'class', 
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [textshadow, typography],
}

