import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'flex justify-center items-center rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-grey-50',
        outline: 'bg-white-100 border border-grey-100',
        blue: 'bg-blue-50',
        red: 'bg-red-50',
      },
      size: {
        s: 'px-2 py-1',
        m: 'py-2 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 's',
    },
  },
);
