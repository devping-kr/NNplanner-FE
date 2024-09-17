import { cva } from 'class-variance-authority';

export const inputContainerVariants = cva(
  'flex w-full items-center gap-2 border px-2 box-border',
  {
    variants: {
      variant: {
        empty: 'border-none bg-inherit shadow-none',
      },
      bgcolor: {
        form: 'bg-green-100',
        search: 'bg-white-100',
      },
      borderRadius: {
        basic: 'rounded-md',
        large: 'rounded-lg',
      },
      height: {
        basic: 'h-[38px]',
        large: 'h-[62px]',
      },
      isFocused: {
        true: 'border-green-600',
        false: 'border-green-400',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
      },
    },
    defaultVariants: {
      borderRadius: 'basic',
      height: 'basic',
      bgcolor: 'form',
    },
  },
);

export const inputVariants = cva(
  'w-full flex items-center bg-transparent text-[14px] placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
);
