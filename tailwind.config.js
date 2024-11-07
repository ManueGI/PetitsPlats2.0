/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./scripts/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      color: {
        lightGrey: "#EDEDED",
      }
    },
  },
  plugins: [],
};
