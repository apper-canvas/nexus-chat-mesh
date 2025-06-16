/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5865F2',
          hover: '#4752C4'
        },
        secondary: '#4752C4',
        accent: '#57F287',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          dark: '#2C2F33'
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#23272A'
        },
        semantic: {
          success: '#57F287',
          warning: '#FEE75C',
          error: '#ED4245',
          info: '#5865F2'
        }
      },
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
        heading: ['Inter', 'ui-sans-serif', 'system-ui'] 
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['14px', '20px'],
        lg: ['16px', '24px'],
        xl: ['18px', '28px'],
        '2xl': ['20px', '28px'],
        '3xl': ['24px', '32px']
      }
    },
  },
  plugins: [],
}