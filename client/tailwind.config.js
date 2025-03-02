
import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },

  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ffcc66',
          secondary: '#006652',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
      
    ],
  },
}

