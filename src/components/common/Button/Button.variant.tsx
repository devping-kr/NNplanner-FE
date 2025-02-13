import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg focus-visible:outline-none whitespace-nowrap disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-green-500 text-white-100 hover:bg-green-600 active:bg-green-700 disabled:bg-grey-200 disabled:text-white-100',
        grey: 'bg-grey-100 text-grey-900 hover:bg-grey-200 active:bg-grey-300 disabled:bg-grey-200 disabled:text-white-100',
        secondary:
          'bg-white-100 text-green-500 hover:bg-grey-200 active:bg-grey-300 disabled:bg-white-100 disabled:text-grey-200',
        teritary:
          'bg-grey-800 text-grey-100 hover:bg-grey-900 active:bg-black-100 disabled:bg-grey-200 disabled:text-white-100',
        outline:
          'bg-white-100 text-black-100 border border-grey-100 hover:bg-grey-100 active:bg-grey-200 disabled:bg-white-100 disabled:text-grey-200 disabled:border-grey-100',
        pagination: '',
        default: '',
      },
      size: {
        // 추후 삭제 예정
        xSmall: 'py-1 px-2 text-xs',
        small: 'py-2 px-4 text-xs',
        basic: 'py-3 px-5 text-sm',
        large: 'py-4 px-6 text-base',
        // 리디자인 추가
        xs: 'h-10',
        sm: 'h-12',
        md: 'h-14',
        lg: 'h-16',
      },
      width: {
        fit: 'w-fit px-4',
        full: 'w-full',
        circular: 'rounded-full w-16 h-16',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'basic',
      width: 'fit',
    },
    compoundVariants: [
      {
        variant: 'pagination',
        className:
          'flex w-8 h-8 p-0 cursor-pointer items-center justify-center rounded-lg bg-white-100 text-black-100 text-base leading-[1.44] tracking-[-0.008em] font-bold border border-grey-100 hover:bg-grey-100 active:bg-grey-200 disabled:cursor-default disabled:hover:bg-white-100',
      },
    ],
  },
);
