import type { Config } from 'tailwindcss';

const colors = {
  buttonOutline: '#4880FF',
  buttonOutlineHover: '#2D6CFC',
  buttonOutlineActive: '#0F58FE',
  thead: '#E5E7EB',
};

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
        buttonPrimary: '#4379EE',
        buttonPrimaryHover: '#2B64E0',
        buttonPrimaryActive: '#195CEB',
        buttonSecondary: '#E2EAF8',
        buttonSecondaryHover: '#D7DFEC',
        buttonSecondaryActive: '#CBD1DD',
        thead: colors.thead,
      },
      textColor: {
        primary: '#FDFDFD',
        white: '#272727',
        label: '#060606',
        buttonOutline: colors.buttonOutline,
        buttonOutlineHover: colors.buttonOutlineHover,
        buttonOutlineActive: colors.buttonOutlineActive,
      },
      borderColor: {
        calendar: '#3F3F3F',
        input: '#D5D5D5',
        card: '#B9B9B9',
        buttonOutline: colors.buttonOutline,
        buttonOutlineHover: colors.buttonOutlineHover,
        buttonOutlineActive: colors.buttonOutlineActive,
        thead: colors.thead,
      },
    },
  },
  plugins: [],
};
export default config;
