import { cva } from 'class-variance-authority';

export const inputContainerVariants = cva(
  'flex w-full items-center gap-2 border p-4',
  {
    variants: {
      variant: {
        empty: 'border-none bg-inherit shadow-none',
      },
      bgcolor: {
        form: 'bg-tableHeader',
        search: 'bg-select',
      },
      borderRadius: {
        basic: 'rounded-md',
        large: 'rounded-lg',
      },
      height: {
        basic: 'h-[36px]',
        large: 'h-md',
      },
      isFocused: {
        true: 'border-card',
        false: 'border-input',
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
  'w-full bg-transparent text-[14px] placeholder:text-gray-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
);
