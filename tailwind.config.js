/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'linear-pink' : '#EB568E',
        'linear-blue' : '#144EE3',
        'linear-light-blue' : '##4377f0',
        'root-bg' : '#0B101B',
        'dark-grey' : '#181E29',
        'lite' : '#C9CED6',
        'drak-border' : '#323E59'
      },
      extend: {
        boxShadow: {
          '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        }
      }
      
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}