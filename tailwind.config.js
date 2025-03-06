/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        red: "#A64F3C",
        yellow: "#DAC081",
        blue: "#B3C8CF",
        darkblue: "#89A8B2",
        lightblue: "#B3C8CF",
        beige: "#E5E1DA",
        gold: "#D4B97B",
        gray: {
          DEFAULT: "#9E9E9E",  
          light: "#CCCCCC"
        }
      },
      screens: {
        sm: { max: '809px' }, // Mobile (iPhone 3 - iPhone XS Max).
        md: { min: '810px', max: '1000px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
        lg: { min: '1001px' }, 
      },
      fontFamily: {
        "poppins-black": ["PoppinsBlack"],
        "poppins-bold": ["PoppinsBold"],
        "poppins-extrabold": ["PoppinsExtraBold"],
        "poppins-extralight": ["PoppinsExtraLight"],
        "poppins-light": ["PoppinsLight"],
        "poppins-medium": ["PoppinsMedium"],
        "poppins-regular": ["PoppinsRegular"],
        "poppins-semibold": ["PoppinsSemiBold"],
        "poppins-thin": ["PoppinsThin"],
        "poppins-italic": ["PoppinsItalic"],
      }
    },
  },
  plugins: [],
}

