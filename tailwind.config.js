/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        saffron: {
          50:  '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#FF6B35',
          600: '#E85D04',
          700: '#c2410c',
        },
        marigold: '#FFB347',
        festrose: '#FF006E',
      },
      animation: {
        'float':          'float 6s ease-in-out infinite',
        'float-reverse':  'float-reverse 7s ease-in-out infinite',
        'spin-slow':      'spin 20s linear infinite',
        'reveal-up':      'reveal-up 0.7s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
        'glow-pulse':     'glow-pulse 3s ease-in-out infinite',
        'shimmer':        'shimmer 3s linear infinite',
        'diya':           'diya-flicker 2s ease-in-out infinite',
        'pulse-ring':     'pulse-ring 1.5s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-12px) rotate(2deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(10px) rotate(-2deg)' },
          '66%':      { transform: 'translateY(5px) rotate(1deg)' },
        },
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(60px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,53,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,107,53,0.7), 0 0 80px rgba(255,0,110,0.3)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'diya-flicker': {
          '0%, 100%': { opacity: '1',    transform: 'scaleY(1) scaleX(1)' },
          '25%':      { opacity: '0.9',  transform: 'scaleY(1.05) scaleX(0.97)' },
          '50%':      { opacity: '0.95', transform: 'scaleY(0.98) scaleX(1.02)' },
          '75%':      { opacity: '1',    transform: 'scaleY(1.03) scaleX(0.99)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      boxShadow: {
        festival:      '0 4px 24px rgba(255,107,53,0.2)',
        'festival-lg': '0 16px 48px rgba(255,107,53,0.3)',
        'festival-xl': '0 24px 64px rgba(255,107,53,0.25)',
      },
      backgroundImage: {
        'saffron-rose': 'linear-gradient(135deg, #FF6B35 0%, #FF006E 100%)',
        'gold-saffron':  'linear-gradient(135deg, #FFB347 0%, #FF6B35 100%)',
        rangoli:         'linear-gradient(135deg, #FF6B35 0%, #FF006E 40%, #7B2D8B 70%, #0077B6 100%)',
      },
    },
  },
  plugins: [],
}
