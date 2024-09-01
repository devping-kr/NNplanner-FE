import { cva } from 'class-variance-authority';

export const selectboxVariants = cva('inline-block relative w-full', {
  variants: {
    isOpen: {
      true: 'z-20',
      false: 'z-10',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});
