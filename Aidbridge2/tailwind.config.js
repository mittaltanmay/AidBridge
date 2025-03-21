/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["outfit", "sans-serif"],
        "outfit-black": ["outfit-black", "sans-serif"],
        "outfit-bold": ["outfit-bold", "sans-serif"],
        "outfit-extraBold": ["outfit-extraBold", "sans-serif"],
        "outfit-extralight":["outfit-extralight","san-serif"],
        "outfit-light":["outfit-light","sans-serif"],
        "outfit-medium":["outift-medium","sans-serif"],
        "outfit-thin":["outfit-thin","sans-serif"],
        "outfit-semibold":["outfit-semibold","sans-seriff"]
    },
  },
  },
  plugins: [],
}