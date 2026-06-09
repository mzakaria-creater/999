/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        accent: '#FFD700',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        dark: {
          bg: '#0A0E27',
          surface: '#111729',
          elevation: '#1A1F3A',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backdropFilter: {
        glass: 'blur(20px) brightness(1.05)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 1px 1px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        slideUpFade: 'slideUpFade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        subtleGlow: 'subtleGlow 3s ease-in-out infinite',
      },
      keyframes: {
        slideUpFade: {
          from: {
            opacity: '0',
            transform: 'translateY(12px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        subtleGlow: {
          '0%, 100%': {
            boxShadow: '0 8px 32px rgba(0, 217, 255, 0.1)',
          },
          '50%': {
            boxShadow: '0 8px 32px rgba(0, 217, 255, 0.15)',
          },
        },
      },
    },
  },
  plugins: [],
}
