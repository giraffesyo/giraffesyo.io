module.exports = {
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './design/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: { code: '#b267e6' },
        blue: { code: '#4a9cd8' },
        green: { code: '#6A9955' },
        gray: { codelight: '#292929', codedark: '#1e1e1e' },
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
