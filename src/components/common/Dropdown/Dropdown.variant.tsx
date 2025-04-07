import { cva } from 'class-variance-authority';

export const dropdownVariants = cva(
  'absolute mt-1 z-10 w-full max-h-56 overflow-y-auto custom-scrollbar bg-white-100 border border-grey-100 rounded-lg shadow-[0_8px_4px_rgba(0,0,0,0.12)]',
  {
    variants: {
      isOpen: {
        true: 'block',
        false: 'hidden',
      },
      // 추후 삭제
      size: {
        small: '',
        basic: '',
        large: '',
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  },
);
