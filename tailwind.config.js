/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#5E1F5D',
        'coral-primary': '#FF5C39',
        'yellow-primary': '#FFB800',
        'blue-primary': '#3E92CC',
        'green-primary': '#4CAF50',
        'cream': '#FFF8E7',
      },
      fontFamily: {
        'averia': ['Averia Libre', 'cursive'],
      },
    },
  },
  plugins: [],
};