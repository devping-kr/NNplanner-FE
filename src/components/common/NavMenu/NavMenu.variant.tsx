import { cva } from 'class-variance-authority';

export const navMenuVariants = cva(
  'flex items-center gap-4 w-full px-6 py-4 bg-transparent h-14 cursor-pointer active:bg-grey-900',
  {
    variants: {
      isActive: {
        true: 'bg-grey-900 text-green-500',
        false: 'text-gray-500',
      },
    },
  },
);
