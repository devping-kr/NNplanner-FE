import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-bold rounded-lg focus-visible:outline-none  disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
          'bg-green-400 text-white-100 hover:bg-green-500 active:bg-green-600 disabled:hover:bg-green-400 disabled:hover:bg-green-400',
        secondary:
          'bg-gray-100 text-dark-100 hover:bg-gray-200 active:bg-gray-300 disabled:hover:bg-gray-100 disabled:hover:bg-gray-100',
        outline:
          'bg-white-100 text-green-700 border-[1px] border-solid border-green-700 hover:border-green-800 hover:text-green-800 active:border-green-900 active:text-green-900 disabled:hover:text-green-700',
        pagination: '',
      },
      size: {
        small: 'py-2 px-4 text-xs',
        basic: 'py-3 px-5 text-sm',
        large: 'py-4 px-6 text-base',
      },
      width: {
        fit: 'w-fit',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'basic',
      width: 'full',
    },
    compoundVariants: [
      {
        variant: 'pagination',
        className:
          'flex w-7 h-7 p-0 cursor-pointer items-center justify-center rounded bg-green-200 text-center text-white-100 hover:bg-green-300 disabled:cursor-default disabled:hover:bg-green-200 active:bg-green-400',
      },
    ],
  },
);
