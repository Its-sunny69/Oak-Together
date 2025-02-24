/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      bgGradientDeg: {
        75: '75deg',
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          // values from config and defaults you wish to use most
          values: Object.assign(
            theme('bgGradientDeg', {}), // name of config key. Must be unique
            {
              10: '10deg', // bg-gradient-10
              15: '15deg',
              20: '20deg',
              25: '25deg',
              30: '30deg',
              45: '45deg',
              60: '60deg',
              79: "79deg",
              90: '90deg',
              120: '120deg',
              135: '135deg',
              180: "180deg",
              281: "281deg",
            }
          )
        }
      )
    }),
    require("tailwindcss-animated")
  ],
}

