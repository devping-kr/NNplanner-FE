import { cva } from 'class-variance-authority';

export const inputContainerVariants = cva(
  'flex w-full items-center gap-2 px-4 rounded-lg',
  {
    variants: {
      variant: {
        white: 'bg-white-100',
        grey50: 'bg-grey-50',
      },
      size: {
        s: 'h-12',
        m: 'h-16',
      },
      isFocused: {
        true: 'border border-green-500',
        false: '',
      },
      disabled: {
        true: '!bg-grey-100 cursor-not-allowed',
      },

      // 추후 삭제 예정
      bgcolor: {
        form: 'bg-green-100',
        search: 'bg-white-200',
        meal: 'bg-white-100',
      },
      borderRadius: {
        basic: 'rounded-md',
        large: 'rounded-lg',
      },
      height: {
        basic: 'h-[38px]',
        large: 'h-[62px]',
      },
      isError: {
        true: 'border-red-300',
      },
      // ---------------
    },
    defaultVariants: {
      borderRadius: 'basic',
      height: 'basic',
      bgcolor: 'form',
      size: 's',
    },
  },
);

export const inputVariants = cva(
  'w-full flex items-center bg-transparent text-[14px] placeholder:text-placeholder focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-grey-100',
  {
    variants: {
      size: {
        s: 'text-base leading-[1.52] tracking-[-0.008em] font-medium',
        m: 'text-lg leading-[1.52] tracking-[-0.008em] font-medium',
      },
    },
    defaultVariants: {
      size: 's',
    },
  },
);
