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

export const selectIconVariants = cva(
  'absolute top-1/2 z-20 -translate-y-1/2',
  {
    variants: {
      size: {
        small: 'right-2',
        basic: 'right-4',
        large: 'right-4',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  },
);
