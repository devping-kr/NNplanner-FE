import { cva } from 'class-variance-authority';

export const navMenuVariants = cva(
  'flex items-center gap-3 w-full px-4 py-3 text-sm bg-transparent h-11 rounded-full cursor-pointer hover:bg-green-100 active:bg-green-100',
  {
    variants: {
      isActive: {
        true: 'bg-green-100 text-green-800 ',
        false: 'text-dark-100',
      },
    },
  },
);
