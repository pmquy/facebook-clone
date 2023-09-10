/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        ssm : '600px',
      },
      keyframes : {
        like : {
          '0%, 100%' : {
            rotate : '0deg',
            scale : '100%',
            'timing-function' : 'cubic-bezier(0.8,0,1,1)',
          },
          '50%' : {
            rotate : '-20deg',
            scale : '120%',
            'timing-function' : 'cubic-bezier(0,0,0.2,1)'
          },
        }
      },
      animation : {
        like : 'like 0.5s 1',
      },
      transitionProperty : {
        width : 'width'
      }
    },
  },
  plugins: [],
}

