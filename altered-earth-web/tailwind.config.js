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
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(107, 70, 193, 0.3)',
        'glow-secondary': '0 0 20px rgba(236, 72, 153, 0.3)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        feelingsunplugged: {
          "primary": "#6B46C1",      // Deep purple - trust, introspection
          "primary-content": "#FFFFFF",
          
          "secondary": "#EC4899",    // Vibrant pink - energy, emotion
          "secondary-content": "#FFFFFF",
          
          "accent": "#F59E0B",       // Warm amber - hope, warmth
          "accent-content": "#1F2937",
          
          "neutral": "#1F2937",      // Dark slate - grounded
          "neutral-content": "#F3F4F6",
          
          "base-100": "#0F172A",     // Near-black background
          "base-200": "#1E293B",     // Slightly lighter bg
          "base-300": "#334155",     // Card backgrounds
          "base-content": "#F1F5F9",
          
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
      "dark",  // Fallback theme
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

