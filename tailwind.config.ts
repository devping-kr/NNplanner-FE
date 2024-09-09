import type { Config } from 'tailwindcss';
import { colors } from './src/styles/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      translate: {
        // transform: translate-Y(-50%)
        '-1/2': '-50%',
      },
      animation: {
        'shrink-1s': 'shrink 1s linear forwards',
        'shrink-2s': 'shrink 2s linear forwards',
        'shrink-3s': 'shrink 3s linear forwards',
      },
      keyframes: {
        shrink: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
