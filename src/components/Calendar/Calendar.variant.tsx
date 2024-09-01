import { cva } from 'class-variance-authority';

export const calendarDayVariants = cva(
  'w-52 h-48 py-3 px-4 flex flex-col bg-primary text-left border-[1px] border-gray-200 hover:border-gray-400 active:border-gray-500',
  {
    variants: {
      isInvalid: {
        true: 'hover:border-gray-200 active:border-gray-200 text-opacity-30 text-black cursor-not-allowed ',
        false: '',
      },
      isActive: {
        true: 'bg-thead',
        false: '',
      },
      readonly: {
        true: 'hover:border-gray-200 active:border-gray-200 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      isInvalid: false,
      isActive: false,
      readonly: false,
    },
  },
);
