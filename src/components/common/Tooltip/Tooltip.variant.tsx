import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  'absolute z-10 w-40 rounded-lg bg-white-100 border border-gray-200 px-3 py-2 text-sm shadow-md break-all',
  {
    variants: {
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      },
    },
  },
);
