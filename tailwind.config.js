const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        global_purpe: "#6E07F3",
        global_black70: "#141C3A"
      },

    },

  },
  darkMode: "class",
  plugins: [nextui()],

}

