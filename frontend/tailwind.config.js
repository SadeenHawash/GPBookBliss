/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
    // Add more file paths if necessary
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6F4E37',
        'secondary': '#e3d3bf',
        'background' : '#faf8f7',
        'background-secondary' : '#e3d3bf',
        'hover-color': '#6e4c33c9',
        'btn-primary': '#e3d3bf',
        'btn-secondary': '#C19A6B',
        'divider-color': '#eaded0',
        'icon-toggle': '#EFDDC8',
        //#f8f3ed
        //DAA06D
        //C19A6B
        //6F4E37
        //#c68b6e
        //#23bcaa
        'secondary': '#ead4e1',
        'brandPink': '#e96d7b'
      },
      container: {
        top: true,
        padding: {
          DEFAULT: '10px',
          sm: '2rem',
        },
      },
      backgroundImage:{
        'bg-image': "url('./public/bbg1.jpg')",
      },
      fontFamily: {
        "Caveat": ['cursive', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
};
