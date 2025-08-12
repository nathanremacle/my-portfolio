/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class', // on contrôle le thème via une classe 'dark' sur html/body
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0f1724',
          800: '#0b1220',
          700: '#0d1520',
          accent: '#4f46e5',
          muted: '#9aa3b2'
        },
        card: '#0f1724'
      },
      borderRadius: {
        'xl2': '1rem'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
