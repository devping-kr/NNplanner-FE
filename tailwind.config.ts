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
      textColor: {
        placeholder: colors.grey[200],
        assistiveTxt: colors.grey[500],
        dimmed: colors.dimmed,
      },
      translate: {
        '-1/2': '-50%',
      },
      boxShadow: {
        dropShadow: '0px 8px 16px rgba(0, 0, 0, 0.12)',
      },
      transitionProperty: {
        colors: 'color, background-color, border-color, text-decoration-color',
      },
      animation: {
        gradient: 'gradient 12s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      plugins: [],
    },
  },
};

export default config;
