/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors:{
        first: '#EDF1F7',
        second: '#004064',
      },
      fontFamily:{
        'myFont': ['cuprum']
      },
    },
  },
  plugins: [],
}

