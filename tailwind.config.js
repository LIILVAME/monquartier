/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js",
    "./src/**/*.{html,js}",
    "./components.css"
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs MonQuartier
        blue: {
          50: '#E8F2FF',
          100: '#D1E5FF',
          200: '#A3CBFF',
          300: '#6BA3F5',
          400: '#5B9BD5',
          500: '#4A90E2', // Couleur principale
          600: '#3A7BD5',
          700: '#2C5AA0',
          800: '#1E3A6F',
          900: '#0F1D37',
        },
        slate: {
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
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'mq-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'mq-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'mq-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'mq-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      borderRadius: {
        'xl': '0.75rem',
      }
    },
  },
  plugins: [],
  // Configuration pour éviter les conflits
  corePlugins: {
    preflight: false, // Désactive le reset CSS de Tailwind pour éviter les conflits
  }
}