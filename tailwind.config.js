/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bita: {
          cyan: '#00e5ff',
          purple: '#7c3aed',
          magenta: '#d946ef',
          dark: '#030507',
          surface: '#080e18',
        }
      }
    },
  },
  plugins: [],
}
