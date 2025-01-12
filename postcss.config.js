// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    purgecss: {
      content: [
        './index.html',
        './scripts/**/*.js',
      ],
    }
  },
}
