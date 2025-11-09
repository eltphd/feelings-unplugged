/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern SaaS Palette - Leonardo.ai + Vercel inspired
        dark: {
          DEFAULT: '#0A0A0A',      // True black background
          100: '#111111',          // Elevated surface
          200: '#1A1A1A',          // Card background
          300: '#2A2A2A',          // Border/divider
        },
        light: {
          DEFAULT: '#FFFFFF',      // White
          100: '#FAFAFA',          // Light gray bg
          200: '#F5F5F5',          // Card background
          300: '#E5E5E5',          // Border
        },
        primary: {
          DEFAULT: '#8B5CF6',      // Purple (Leonardo.ai vibe)
          dark: '#7C3AED',
          light: '#A78BFA',
        },
        accent: {
          DEFAULT: '#06B6D4',      // Cyan
          dark: '#0891B2',
          light: '#22D3EE',
        },
        success: '#10B981',        // Green
        warning: '#F59E0B',        // Amber
        danger: '#EF4444',         // Red
      },
      fontFamily: {
        // System fonts for accessibility and cognitive load reduction
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        // Muted, purposeful animations only
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
        'progress': 'progress 1s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-12px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'progress': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
