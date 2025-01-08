import { cva } from 'class-variance-authority';

export const toastVariants = cva('', {
  variants: {
    variant: {
      // 추후 삭제
      normal: 'bg-gray-500',
      // 리디자인 variants
      success: 'bg-green-50 text-black-100',
      info: 'bg-blue-50 text-black-100',
      warning: 'bg-red-50 text-red-500',
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
});
