/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      backgroundColor: {
        main: 'rgb(245, 245, 245)'
      },
      boxShadowColor: {
        main: 'rgb(0 0 0 / 5%)'
      },
      boxShadow: {
        card: '0px 12px 15px 5px rgb(99 102 241 / 40%)'
      },
    }
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
