import { cva } from 'class-variance-authority';

export const navMenuVariants = cva(
  'flex items-center gap-3 w-full px-4 py-3 text-sm bg-transparent h-11 rounded-full cursor-pointer',
  {
    variants: {
      isActive: {
        true: 'bg-NavActionBg text-navActionText',
        false: 'text-navNoActionText',
      },
    },
  },
);
