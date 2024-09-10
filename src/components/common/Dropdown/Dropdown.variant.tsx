import { cva } from 'class-variance-authority';

export const dropdownVariants = cva(
  'absolute z-10 w-full max-h-56 overflow-y-scroll custom-scrollbar bg-white-100 border-[1px] border-red rounded-md shadow-md',
  {
    variants: {
      isOpen: {
        true: 'block',
        false: 'hidden',
      },
      size: {
        small: 'rounded-md mt-1',
        basic: 'rounded-lg mt-[6px]',
        large: 'rounded-lg mt-2',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  },
);
