module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0,0,0,0.8)",
      },
      boxShadow: {
        around: "0px 0px 0px 3px rgba(0,0,0,0.3)",
      },
      screens: {
        xxl: "1440px",
      },
      lineHeight: {
        zero: "0 !important",
      },
      backgroundImage: {
        login: "url('/assets/bg-01.jpg')",
      },
      transitionProperty: {
        width: "width"
      }
    },
  },
  plugins: [],
};
