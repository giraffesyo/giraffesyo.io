module.exports = {
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './design/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: { code: '#b267e6' },
        blue: {
          code: '#4a9cd8',
          twitter: 'rgb(85, 172, 238)',
          linkedin: 'rgb(0, 123, 181)',
        },
        green: { code: '#6A9955' },
        gray: {
          codelight: '#292929',
          codedark: '#1e1e1e',
          codelightest: '#3c3c3c',
        },
        orange: { code: 'rgb(184, 85, 40)' },
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
