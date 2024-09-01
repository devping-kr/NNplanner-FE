import { cva } from 'class-variance-authority';

export const navMenuVariants = cva(
  'flex items-center gap-3 w-full px-4 py-3 text-sm bg-transparent h-11 rounded-full cursor-pointer hover:bg-navAction active:bg-navActionActive',
  {
    variants: {
      isActive: {
        true: 'bg-navAction text-navAction ',
        false: 'text-navNoAction',
      },
    },
  },
);
