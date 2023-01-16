/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        lake: '#64E1FB',
        ocean: '#50B2F5',
        leaves: '#8EEABB'
      }
    },
  },
  plugins: [],
}
