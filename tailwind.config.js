/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          black: '#000000',
          gray6: '#1C1C1E',
          gray5: '#2C2C2E',
          gray4: '#3A3A3C',
          gray3: '#48484A',
          gray2: '#636366',
          gray1: '#8E8E93',
          white: '#FFFFFF',
          separator: '#38383A',
        },
        accent: {
          blue: '#007AFF',
          green: '#30D158',
          red: '#FF3B30',
          orange: '#FF9F0A',
          indigo: '#5E5CE6',
        },
        success: '#30D158',
        warning: '#FF9F0A',
        error: '#FF3B30',
        text: {
          primary: '#FFFFFF',
          secondary: '#8E8E93',
          tertiary: '#636366',
        },
      },
      fontFamily: {
        apple: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Display', 'sans-serif'],
      },
      boxShadow: {
        'apple-card': '0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4)',
        'apple-card-hover': '0 1px 0 rgba(255,255,255,0.10), 0 4px 12px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.6)',
        'apple-elevated': '0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5)',
        'apple-inset': 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)',
        'apple-button': '0 1px 0 rgba(255,255,255,0.15), 0 4px 12px rgba(0,122,255,0.35)',
      },
      animation: {
        'apple-enter': 'appleSlideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'apple-slide': 'appleSlideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'apple-pulse': 'applePulse 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
      },
      keyframes: {
        appleSlideUp: {
          from: {
            opacity: '0',
            transform: 'translateY(16px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        appleSlideIn: {
          from: {
            opacity: '0',
            transform: 'translateX(-12px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        applePulse: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.01)',
          },
        },
      },
    },
  },
  plugins: [],
}
