import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'dharma': ['DharmaGothicC', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'sans': ['Manrope', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        '250px': '250px',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'duque': {
          'red': '#EF400B',
          'gray': '#232323',
          'white': '#FFFFFF',
          'gray-light': '#2a2a2a',
          'gray-dark': '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
}

export default config 