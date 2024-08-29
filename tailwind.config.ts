import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#F5F6FA',
        active: '#4880FF',
        tableHeader: '#F1F4F9',
        button: '#FAFBFD',
        select: '#F9F9FB',
        apply: '#E2EAF8',
      },
      textColor: {
        primary: '#FDFDFD',
        white: '#272727',
        label: '#060606',
      },
      borderColor: {
        calendar: '#3F3F3F',
        input: '#D5D5D5',
        card: '#B9B9B9',
      },
    },
  },
  plugins: [],
};
export default config;
