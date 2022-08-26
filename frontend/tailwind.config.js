/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: "'Open Sans', sans-serif",
        cormorant: "'Cormorant Upright', serif",
        ubuntu :  "'Ubuntu' , serif",
      },

      colors: {
        color_golden: "#DCCA87",
        color_black: "#0C0C0C",
        color_gray: "#545454",
        color_crimson: "#F5EFDB",
        color_grey: "#AAAAAA",
        color_white: "#FFFFFF",
      },
      screens: {
        '3xl': '1855px',
      },
    },
  },
  plugins: [],
};
