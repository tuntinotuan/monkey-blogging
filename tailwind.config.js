/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkPrimary: "#2EBAC1",
        darkMain: "#090E1A",
        darkTextA0: "#CBD5E1",
      },
    },
  },
  plugins: [],
};
