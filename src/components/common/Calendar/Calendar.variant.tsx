import { cva } from 'class-variance-authority';

export const calendarDayVariants = cva('', {
  variants: {
    isInvalid: {
      true: 'text-opacity-[24%]',
      false: '',
    },
  },
});

export const calendarDayButtonVariants = cva(
  'flex max-h-[202px] min-h-[180px] w-full flex-col gap-2 bg-white-100 p-2 pb-4 text-left hover:bg-grey-50',
  {
    variants: {
      isInvalid: {
        true: 'cursor-not-allowed hover:bg-white-100',
        false: '',
      },
      isActive: {
        true: 'bg-grey-50',
        false: '',
      },
      readonly: {
        true: 'pointer-events-none',
        false: '',
      },
    },
  },
);
