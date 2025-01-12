/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
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
