/* eslint-disable no-undef */
module.exports = {
  purge: [
    '.src/pages/**/*.{js,ts,jsx,tsx}',
    '.src/components/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkgray: '#3A4750',
        darkgraysecondary: '#4B5D67',
        textPrimary: '#EEEEEE',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
