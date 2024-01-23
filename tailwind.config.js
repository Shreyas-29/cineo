/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F43F5E",
        secondary: "#1A1A1A",
        "primary-light": "#FF768B",
        "primary-extra-light": "#FFE0ED",
        "primary-dark": "#0A3C60",
        "secondary-light": "#292929",
        "secondary-extra-dark": "#404040",
        white: "#FFFFFF",
        black: "#000000",
        grey: "#E0E0E0",
      },
      fontSize: {
        "2xs": "10px",
      },
    },
  },
  plugins: [],
};
