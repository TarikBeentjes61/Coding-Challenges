/** @type {import('tailwindcss').Config} */
const textshadow = require('tailwindcss-textshadow');

module.exports = {
  darkMode: 'class', 
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [textshadow],
}

