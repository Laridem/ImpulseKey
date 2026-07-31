/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kinetic Pulse Light - Design System Colors
        surface: {
          DEFAULT: '#fff7f9',
          dim: '#e8d5e1',
          bright: '#fff7f9',
          'container-lowest': '#ffffff',
          'container-low': '#ffeff8',
          container: '#fce8f5',
          'container-high': '#f7e3ef',
          'container-highest': '#f1ddea',
          variant: '#f1ddea',
        },
        primary: {
          DEFAULT: '#a800aa',
          container: '#f65af2',
          fixed: '#ffd7f6',
          'fixed-dim': '#ffaaf5',
        },
        secondary: {
          DEFAULT: '#5d38e3',
          container: '#7656fd',
          fixed: '#e6deff',
          'fixed-dim': '#cabeff',
        },
        tertiary: {
          DEFAULT: '#006b5b',
          container: '#00b098',
          fixed: '#71f9dd',
          'fixed-dim': '#50dcc2',
        },
        text: {
          DEFAULT: '#231821',
          variant: '#534150',
          inverse: '#ffebf8',
        },
        outline: {
          DEFAULT: '#867181',
          variant: '#d8bfd1',
        },
        // IMPULSE KEYS personality colors (updated for new theme)
        'voc': '#FF6B4A',
        'fiori': '#7656fd',    // Updated to secondary
        'pixel': '#f65af2',    // Updated to primary-container
        'a11y': '#a800aa',     // Updated to primary
        'joule': '#FFD74A',
        'ctrl': '#867181',     // Updated to outline
        'agent': '#00b098',    // Updated to tertiary-container
        'safe': '#006b5b',     // Updated to tertiary
        'odata': '#50dcc2',    // Updated to tertiary-fixed-dim
        'btp': '#5d38e3',      // Updated to secondary
        'core': '#534150',     // Updated to text-variant
        'api': '#71f9dd',      // Updated to tertiary-fixed
        'qaq': '#FFAB4A',
        'logs': '#231821',     // Updated to text
        'trio': '#cabeff',     // Updated to secondary-fixed-dim
        'fire': '#ba1a1a',     // Updated to error
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'Noto Sans SC', 'sans-serif'],
        'inter': ['Inter', 'Noto Sans SC', 'sans-serif'],
        'noto-sans': ['Noto Sans SC', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['80px', { lineHeight: '80px', letterSpacing: '-3.2px', fontWeight: '700' }],
        'display-lg': ['48px', { lineHeight: '57.6px', letterSpacing: '-0.96px', fontWeight: '500' }],
        'display-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.6px', fontWeight: '700' }],
        'headline-sm': ['16px', { lineHeight: '24px', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '29.25px', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '22.75px', fontWeight: '500' }],
        'label-caps': ['12px', { lineHeight: '18px', fontWeight: '500' }],
      },
      spacing: {
        'gutter': '24px',
        'margin-mobile': '16px',
        'margin-desktop': '48px',
      },
      maxWidth: {
        'container': '1280px',
      },
      borderRadius: {
        DEFAULT: '16px',
        'none': '0',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'soft': '0 8px 32px -8px rgba(168,0,170,0.12), 0 4px 16px -4px rgba(168,0,170,0.08)',
        'soft-lg': '0 16px 48px -12px rgba(168,0,170,0.18), 0 8px 24px -6px rgba(168,0,170,0.12)',
        'neo': '0 8px 32px -8px rgba(168,0,170,0.15), 0 0 0 1px rgba(168,0,170,0.05)',
        'neo-lg': '0 16px 64px -16px rgba(168,0,170,0.2), 0 8px 32px -8px rgba(168,0,170,0.15)',
      },
      textShadow: {
        'kinetic': '5px 5px 0px #00f5e1, 0px 4px 4px #f65af2',
        'kinetic-sm': '2px 2px 0px #00f5e1, 0px 2px 2px #f65af2',
      },
    },
  },
  plugins: [],
}
