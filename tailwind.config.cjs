/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'ip': '430px',
      'xll':'2560px'
    },
    extend: {
      colors: {
        "custom-blue": "#3661eb",
        "custom-grey": "#f6f6ff",
        "custom-logo": "#5b1215",
        "custom-nav":"rgb(31, 41, 55)",
        "custom-sidebar-blue": "#4b49ac",
        "custom-button-purple":"#b199f8",
        "custom-theme":"#3b97dc",
        theme: "#3b97dc",
        themeLight: "#F6F3FE",
    },
    },
  },
  plugins: [],
});
