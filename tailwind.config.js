/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1536px',
      'xxxl': '1920px'
    },
    extend: {
      // container: {
      //   padding: {
      //     xxl: '6rem',
      //   },
      // },
      // screens: {
      //   xxl: '1536px'
      // },
      backgroundColor: {
        main: '#fff'
        // main: 'rgb(245, 245, 245)'
      },
      textColor: {
        primary: '#a166ef'
      },
      boxShadowColor: {
        main: 'rgb(0 0 0 / 5%)'
      },
      boxShadow: {
        card: '0px 5px 10px 3px rgb(99 102 241 / 40%)',
        sidebar: '15px 0px 10px 0 #ecf0f3' // 侧边栏的阴影
        // card: '0px 12px 15px 5px rgb(99 102 241 / 40%)'
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
