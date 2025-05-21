/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3CCFCF",
        secondary: "#F0FDFD",
        accent: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
