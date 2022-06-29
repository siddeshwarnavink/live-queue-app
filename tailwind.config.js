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
      },
      animation: {
        'live-now': 'liveNow 2s ease infinite',
        'list-from-top': 'listFromTop 300ms ease-out'
      },
      keyframes: {
        liveNow: {
          '0%': { opacity: .7 },
          '50%': { opacity: 1 },
          '100%': { opacity: .7 },
        },
        listFromTop: {
          '0%': {
            transform: 'translateY(-20px)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        }
      },
    },
  },
  plugins: [],
}
