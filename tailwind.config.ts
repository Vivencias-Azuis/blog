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
        // Paleta Vivências Azuis
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
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
export default config