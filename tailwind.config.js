/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'spartan': ['"Arimo"', 'sans-serif'],
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
        },
        '.scrollbar-thumb-custom': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#f5f5f5',
          },
        },
        '.scrollbar-track-gray-lighter': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(229, 231, 235, 0.1)',
          },
          '.pointer-events-none': {
            'pointer-events': 'none',
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}