/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        killarney: {
          50: "#f5f9f4",
          100: "#e5f3e5",
          200: "#cbe7cb",
          300: "#a2d3a3",
          400: "#72b673",
          500: "#4e994f",
          600: "#3c7d3d",
          700: "#336534",
          800: "#2b502c",
          900: "#254227",
          950: "#102311",
        },
        energy: {
          50: "#fdfbe9",
          100: "#fcf8c5",
          200: "#fbef8d",
          300: "#f8de4f",
          400: "#f4c91b",
          500: "#e4b10e",
          600: "#c4890a",
          700: "#9d620b",
          800: "#824e11",
          900: "#6e3f15",
          950: "#402008",
        },
        thorns: {
          50: "#fdf3f3",
          100: "#fde3e3",
          200: "#fccccc",
          300: "#f8a9a9",
          400: "#f27777",
          500: "#e74c4c",
          600: "#d42e2e",
          700: "#b22323",
          800: "#932121",
          900: "#802323",
          950: "#420d0d",
        },
      },
    },
  },
  plugins: [],
};
