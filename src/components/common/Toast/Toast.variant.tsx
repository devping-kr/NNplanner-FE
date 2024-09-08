import { cva } from 'class-variance-authority';

export const progressVariants = cva('h-full origin-left animate-shrink', {
  variants: {
    variant: {
      normal: 'bg-gray-500',
      success: 'bg-blue-200',
      warning: 'bg-red-200',
    },
  },
});
