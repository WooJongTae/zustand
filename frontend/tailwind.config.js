/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // screens: {
    //   tablet: "960px",
    // },
    extend: {
      backgroundImage: {
        main: "url('./assets/bg.jpg')",
      },
    },
  },
  plugins: [],
};
