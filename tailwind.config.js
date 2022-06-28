/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': {
          700: '#512DA8'
        }
      }
    },
  },
  plugins: [],
}
