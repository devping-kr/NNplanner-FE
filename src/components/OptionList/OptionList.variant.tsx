import { cva } from 'class-variance-authority';

export const optionListVariants = cva('flex h-full w-full flex-col', {
  variants: {
    size: {
      small: 'pl-2 pt-2 pb-2 py-2 gap-1 text-sm rounded-md',
      basic: 'pl-[10px] pt-[10px] pb-[10px] py-3 gap-2 text-basic rounded-lg',
      large: 'pl-3 pt-3 pb-3 py-4 gap-2 text-lg rounded-lg',
    },
  },
});
