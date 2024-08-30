import { cva } from 'class-variance-authority';

export const iconVariants = cva('inline-block w-fit h-fit', {
  variants: {
    padding: {
      small: 'p-1',
      basic: 'p-2',
      large: 'p-4',
    },
  },
  defaultVariants: {
    padding: 'small',
  },
});
