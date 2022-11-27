module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss")("./src/tailwind.config.js"),
        require("autoprefixer"),
        require('@tailwindcss/forms'),
        require("@tailwindcss/aspect-ratio"),
        require('tailwind-scrollbar-hide')
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
          primary: '#0e75bc',
          secondary: '#0b5e96',
          dark: '#073b5e',
          light: '#6eacd7',
          superlight: '#b7d6eb'
        },
        new: {
          primary: '#ad596d',
          light: '#bf7e8e'
        }
      },
    },
  },
  plugins: [],
}
