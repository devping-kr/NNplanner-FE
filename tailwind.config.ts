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
        dimmend: colors.dimmed,
      },
      translate: {
        '-1/2': '-50%',
      },
    },
  },
  plugins: [],
};
export default config;
