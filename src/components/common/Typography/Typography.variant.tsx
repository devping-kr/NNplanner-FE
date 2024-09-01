import { cva } from 'class-variance-authority';

export const typographyVariants = cva(
  'whitespace-pre-line text-wrap font-semibold',
  {
    variants: {
      type: {
        heading1: 'text-[24px] leading-[145%]',
        heading2: 'text-[22px] leading-[145%]',
        heading3: 'text-[18px] leading-[155%]',
        heading4: 'text-[16px] leading-[155%]',
        title1: 'text-[20px] leading-[155%]',
        title2: 'text-[18px] leading-[155%]',
        title3: 'text-[16px] leading-[155%]',
        title4: 'text-[14px] leading-[155%]',
        title5: 'text-[12px] leading-[155%]',
        body1: 'text-[18px] leading-[155%]',
        body2: 'text-[16px] leading-[155%]',
        body3: 'text-[14px] leading-[155%]',
        subLabel1: 'text-[16px] leading-[155%]',
        subLabel2: 'text-[14px] leading-[155%]',
        caption1: 'text-[12px] leading-[155%]',
        caption2: 'text-[8px] leading-[155%]',
        question: 'text-[22px] leading-[145%]',
      },
      weight: {
        bold: 'font-bold',
        thin: 'font-thin',
      },
      color: {
        primary: 'text-primary',
        white: 'text-white',
        label: 'text-label',
      },
    },
    defaultVariants: {
      type: 'body3',
      color: 'primary',
    },
  },
);
