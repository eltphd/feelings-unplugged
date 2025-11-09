/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cognitive Calm Palette - Monochrome + Soft Pastels
        charcoal: '#2D3748',      // Primary text (SDT: clarity)
        stone: '#57534E',          // Secondary text
        slate: '#475569',          // Neutral dark
        ash: '#E7E5E4',            // Light backgrounds
        pearl: '#FAFAF9',          // Off-white base
        lavender: '#C4B5FD',       // Calm, introspection
        mint: '#A7F3D0',           // Growth, competence
        blush: '#FECACA',          // Warmth, relatedness

        // Legacy support (will phase out)
        'off-white': '#FAFAF9',
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
