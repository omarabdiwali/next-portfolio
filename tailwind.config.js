/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '128': '28rem'
      },
      boxShadow: {
        '3xl': '0px 0px 80px 35px rgba(0, 255, 0, 0.2)',
      },
      height: {
        'quarter': '60vh',
      },
      width: {
        'cardfull': '23vw',
        'cardsmall': '45vh',
        'cardall': '90vh'
      },
      maxHeight: {
        'body': '32vh',
      },
      screens: {
        'xs': '375px',
        'xxs': '0px'
      }
    },
  },
  plugins: [],
}
