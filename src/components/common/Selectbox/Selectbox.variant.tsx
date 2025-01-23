import { cva } from 'class-variance-authority';

export const selectboxVariants = cva('inline-block relative w-full', {
  variants: {
    isOpen: {
      true: 'z-20',
      false: 'z-10',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export const selectIconVariants = cva(
  'absolute top-1/2 z-20 -translate-y-1/2 right-4',
  {
    variants: {
      size: {
        // 리디자인 완료 후 삭제
        small: '',
        basic: '',
        large: '',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  },
);
