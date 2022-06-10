/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", './app.js'],
  theme: {
    fontFamily: {
      'sans': ['DM Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        accent1: "hsl(10, 79%, 65%)",
        accent2: "hsl(186, 34%, 60%)",
        neutral1: "hsl(25, 47%, 15%)",
        neutral2: "hsl(28, 10%, 53%)",
        neutral3: "hsl(27, 66%, 92%)",
        neutral4: "hsl(33, 100%, 98%)",
      },
    },
  },
  plugins: [],
};
