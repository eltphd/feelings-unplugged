/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'glow': '0 18px 40px rgba(71, 59, 56, 0.2)',
        'glow-secondary': '0 18px 40px rgba(140, 166, 164, 0.25)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        feelingsunplugged: {
          "primary": "#B7664F",      // Terracotta warmth
          "primary-content": "#FCF9F3",

          "secondary": "#465B73",    // Muted scholastic slate
          "secondary-content": "#F9F4EA",

          "accent": "#6D8B8A",       // Dusty teal for balance
          "accent-content": "#0F1C1B",

          "neutral": "#2E2A29",      // Charcoal grounding
          "neutral-content": "#F7F2E7",

          "base-100": "#F4EEE2",     // Parchment background
          "base-200": "#E6DDCE",     // Paper stack
          "base-300": "#D6C9B6",     // Card edging
          "base-content": "#2E2A29",

          "info": "#5E7FAF",
          "success": "#588B6A",
          "warning": "#D9A441",
          "error": "#C2625A",
        },
      },
      "cupcake",  // Fallback theme
    ],
    darkTheme: "feelingsunplugged",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}

