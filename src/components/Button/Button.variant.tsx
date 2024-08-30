import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold rounded-lg focus-visible:outline-none  disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-buttonPrimary text-primary hover:bg-buttonPrimaryHover active:bg-buttonPrimaryActive',
        secondary:
          'bg-buttonSecondary text-label hover:bg-buttonSecondaryHover active:bg-buttonSecondaryActive',
        outline:
          'text-buttonOutline border-[1px] border-solid border-buttonOutline hover:border-buttonOutlineHover hover:text-buttonOutlineHover active:border-buttonOutlineActive active:text-buttonOutlineActive',
      },
      size: {
        small: 'py-2 px-4 text-xs',
        basic: 'py-3 px-5 text-sm',
        large: 'py-4 px-6 text-base',
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
