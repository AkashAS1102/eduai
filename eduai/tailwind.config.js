/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'ticker': 'ticker 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-delay2': 'float 6s ease-in-out 4s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'scaleIn': 'scaleIn 0.5s ease-out forwards',
        'progress': 'progress 2s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '75%' },
          '100%': { width: '45%' },
        },
      },
      backgroundImage: {
        'blue-radial': 'radial-gradient(ellipse at top, #dbeafe 0%, #eff6ff 50%, #ffffff 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(59, 130, 246, 0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'glass-hover': '0 20px 60px rgba(59, 130, 246, 0.15), 0 4px 16px rgba(0,0,0,0.06)',
        'card': '0 8px 30px rgb(0,0,0,0.06)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.12)',
        'input': '0 4px 20px rgba(59, 130, 246, 0.1)',
        'btn': '0 4px 15px rgba(17, 24, 39, 0.3)',
      }
    },
  },
  plugins: [],
}
