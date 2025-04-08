/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {

      backgroundImage: {
        'avengers-img': "url('/src/assets/avengers.jpg')",
      },
      colors: {
        'primary-color': '#4a5a6a',
        'Light-Beige': '#dcdcdc',
        'hover-Soft':'#c0c0c0',
      },

      fontFamily:{
        cursive:'cursive;'
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
      },
    },

      
      
    },
  },
   plugins: [
   
  ],
}

