/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {      
      colors: {
        'tif-logo-blue': '#0997D5',
        'tif-logo-black': '#000000',
        'tif-blue': '#899CFA',
        'tif-lavender': '#8A79FE',
        'tif-pink': '#B78B9F',
        'tif-grey': '#F2F2F3',
      },
    },
  },
  plugins: [],
}
