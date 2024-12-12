/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'macaron': {
          pink: '#FFD1DC',
          mint: '#98FF98',
          lavender: '#E6E6FA',
          yellow: '#FFFACD',
          blue: '#ADD8E6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundColor: {
        'macaron-pink': 'var(--macaron-pink)',
        'macaron-mint': 'var(--macaron-mint)',
        'macaron-lavender': 'var(--macaron-lavender)',
        'macaron-yellow': 'var(--macaron-yellow)',
        'macaron-blue': 'var(--macaron-blue)',
      },
      textColor: {
        'macaron-pink': 'var(--macaron-pink-text)',
        'macaron-mint': 'var(--macaron-mint-text)',
        'macaron-lavender': 'var(--macaron-lavender-text)',
        'macaron-yellow': 'var(--macaron-yellow-text)',
        'macaron-blue': 'var(--macaron-blue-text)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  safelist: [
    {
      pattern: /bg-(macaron)-(pink|mint|lavender|yellow|blue)/,
      variants: ['hover'],
    },
    {
      pattern: /text-(macaron)-(pink|mint|lavender|yellow|blue)/,
      variants: ['hover'],
    },
  ],
};