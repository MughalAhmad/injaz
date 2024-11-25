/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        title: '1.875rem', //3xl, // 30px
        main: '2.25rem', //4xl, //36px
      },
    },
  },
  plugins: [],
}

