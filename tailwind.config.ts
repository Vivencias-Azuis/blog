import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy palette (keep for compatibility)
        'azul-suave': '#7DB8E5',
        'azul-profundo': '#335C81',
        'cinza-claro': '#E9E9E9',
        'amarelo-quente': '#FFD066',
        'verde-menta': '#83D0C9',
        primary: {
          DEFAULT: '#7DB8E5', // azul-suave
          dark: '#335C81', // azul-profundo
        },
        secondary: {
          DEFAULT: '#83D0C9', // verde-menta
          warm: '#FFD066', // amarelo-quente
        },
        neutral: {
          light: '#E9E9E9', // cinza-claro
        },
        // Design system palette
        blue: {
          900: '#0B2342',
          800: '#123A66',
          700: '#17528C',
          600: '#1E6DB0',
          500: '#2F83C7',
          400: '#4E9AD6',
          300: '#7AB4E3',
          200: '#A9CCED',
          100: '#D7E7F7',
        },
        sand: {
          900: '#2A2520',
          800: '#3B342C',
          700: '#4D443A',
          600: '#6B6155',
          500: '#8A7E70',
          400: '#A89C8D',
          300: '#C4BAAE',
          200: '#DED7D0',
          100: '#F2EFEA',
        },
        brand: {
          DEFAULT: '#1E6DB0',
          soft: '#D7E7F7',
          dark: '#123A66',
        },
        page: '#F2EFEA',
        surface: '#FFFFFF',
        border: '#DED7D0',
        link: {
          DEFAULT: '#17528C',
          hover: '#123A66',
        },
        state: {
          info: '#2F83C7',
          success: '#1E7A5D',
          warning: '#C48A1B',
          error: '#C6453B',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-source-serif)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 35, 66, 0.08)',
        pop: '0 6px 16px rgba(11, 35, 66, 0.12)',
        overlay: '0 12px 28px rgba(11, 35, 66, 0.16)',
      },
      borderRadius: {
        input: '6px',
        card: '10px',
        block: '16px',
        pill: '999px',
      },
      spacing: {
        4.5: '18px',
        7: '28px',
        9: '36px',
        11: '44px',
        13: '52px',
      },
    },
  },
  plugins: [],
}
export default config
