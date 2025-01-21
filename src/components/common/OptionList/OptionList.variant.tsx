import { cva } from 'class-variance-authority';

export const optionListUlVariants = cva('flex h-full w-full flex-col', {
  variants: {
    // 추후 삭제
    size: {
      small: '',
      basic: '',
      large: '',
    },
  },
});

export const optionListLiVariants = cva(
  'cursor-pointer px-4 py-3 hover:bg-gray-50 active:bg-white-100 active:text-green-500',
  {
    variants: {
      // 추후 삭제
      size: {
        small: '',
        basic: '',
        large: '',
      },
    },
  },
);
