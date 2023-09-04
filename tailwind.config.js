module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      green: '#13ce66',
      black: '#0A1017',
      'black-light': '#141D25',
      'black-lighter': '#1F2A36',
      'gray-darker': '#273444',
      'gray-dark': '#39435C',
      gray: '#525F74',
      'gray-light': '#6B798E',
      'gray-lighter': '#8492a6',
      white: '#d3dce6',
      'calm-primary': 'rgba(96, 165, 250, 1)',
      'calm-secondary': 'rgba(90, 200, 180, 1)',
      'calm-warning': 'rgba(255, 255, 153, 1)',
      'calm-accent': 'rgba(235, 87, 87, 1)',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        white: '0 10px 30px -30px rgba(255, 255, 255, 0.2)',
        gray: '0 10px 30px -30px rgba(20, 29, 37, 1)',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
