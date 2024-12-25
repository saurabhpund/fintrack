/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#21AD75',
        secondary: '#D72638',
        accent: '#e67e22',
        background: '#f9f9f9',
        text: '#333',
      },
    },
  },
  plugins: [],
}

