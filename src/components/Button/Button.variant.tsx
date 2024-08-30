import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg focus-visible:outline-none  disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-buttonPrimary text-primary font-bold hover:bg-buttonPrimaryHover active:bg-buttonPrimaryActive',
        secondary:
          'bg-buttonSecondary text-label font-bold hover:bg-buttonSecondaryHover active:bg-buttonSecondaryActive',
        outline:
          'text-buttonOutline font-bold border-[1px] border-solid border-buttonOutline hover:border-buttonOutlineHover hover:text-buttonOutlineHover active:border-buttonOutlineActive active:text-buttonOutlineActive',
      },
      size: {
        small: 'h-10 px-4 text-xs',
        basic: 'h-12 px-5 text-sm',
        large: 'h-[60px] px-6 text-base',
      },
      width: {
        fit: 'w-fit',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'basic',
      width: 'full',
    },
  },
);
