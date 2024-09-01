import { cva } from 'class-variance-authority';

export const selectButtonVariants = cva(
  'w-full border-[1px] border-input rounded-md bg-button text-left focus:border-buttonOutline focus:outline-none',
  {
    variants: {
      size: {
        small: 'px-3 py-2 text-sm rounded-md',
        basic: 'px-5 py-3 text-basic rounded-lg',
        large: 'px-7 py-5 text-lg rounded-lg',
      },
    },
  },
);
