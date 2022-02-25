module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss")("./src/tailwind.config.js"),
        require("autoprefixer"),
      ],
    },
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blue: {
          primary: '#597bad',
          secondary: '#5469D0',
          dark: '#3e577d',
          light: '#94aaca'
        },
        new: {
          primary: '#ad596d',
          light: '#bf7e8e'
        }
      }
    },
  },
  plugins: [],
}
