import { cva } from 'class-variance-authority';

export const selectButtonVariants = cva(
  'w-full rounded-lg text-left text-nowrap border border-transparent focus:border-green-500 focus:border focus:outline-none',
  {
    variants: {
      buttonSize: {
        sm: 'h-12 px-4 py-3 pr-[46px]',
        md: 'h-16 px-4 py-4',
      },
      bgColor: {
        grey: 'bg-grey-50',
        white: 'bg-white-100',
        disabled:
          'bg-grey-100 text-grey-500 cursor-not-allowed focus:border-transparent',
      },
      isError: {
        true: 'border-red-300',
      },
      // 리디자인 완성 시 삭제
      size: {
        small: '',
        basic: '',
        large: '',
      },
    },
  },
);

export const typoVariants = cva('whitespace-pre-line text-wrap', {
  variants: {
    buttonSize: {
      sm: 'text-base leading-[1.52] tracking-[-0.008em] font-medium',
      md: 'text-lg leading-[1.52] tracking-[-0.008em] font-medium',
    },
    state: {
      selected: 'text-black-100',
      placeholder: 'text-grey-200',
    },
  },
});
