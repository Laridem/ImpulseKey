/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IMPULSE KEYS brand colors
        'voc': '#FF6B4A',      // Voice-of-Customer Detective - Orange/Coral
        'fiori': '#4A90FF',    // Fiori Experience Guardian - Blue
        'pixel': '#FF4A8C',    // Pixel-Level Perfectionist - Pink
        'a11y': '#8C4AFF',     // Accessibility Conscience - Purple
        'joule': '#FFD74A',    // Joule Dream Weaver - Yellow/Gold
        'ctrl': '#9E9E9E',     // Human Control Keeper - Gray/Silver
        'agent': '#4AFFDB',    // Agentic Workflow Prophet - Teal
        'safe': '#4AFF7D',     // Trustworthy AI Therapist - Green
        'odata': '#4AD9FF',    // Process Contract Cartographer - Cyan
        'btp': '#1A3A5C',      // Prototype Escape Artist - Navy
        'core': '#8B4513',     // Clean Core Monk - Brown
        'api': '#7DFFB8',      // Developer Experience Whisperer - Mint
        'qaq': '#FFAB4A',      // Quality Empath - Peach
        'logs': '#555555',     // Production Reality Reader - Dark Gray
        'trio': '#9370DB',     // HPOM Alignment Summoner - Violet
        'fire': '#FF4A4A',     // Customer Firefighter - Red
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
