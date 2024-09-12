import { cva } from 'class-variance-authority';

export const optionListUlVariants = cva('flex h-full w-full flex-col', {
  variants: {
    size: {
      small: 'pl-2 pt-2 pb-2 pr-1 gap-1 text-sm rounded-md',
      basic:
        'pl-[10px] pt-[10px] pb-[10px] pr-[5px] gap-2 text-basic rounded-lg',
      large: 'pl-3 pt-3 pb-3 pr-[6px] gap-2 text-lg rounded-lg',
    },
  },
});

export const optionListLiVariants = cva(
  'cursor-pointer rounded-md hover:bg-gray-100 active:bg-gray-200',
  {
    variants: {
      size: {
        small: 'pt-2 pb-2 pl-2 mr-1 gap-1 text-sm rounded-md',
        basic: 'p-[10px] mr-[5px] gap-2 text-basic rounded-lg ',
        large: 'pl-3 mr-[6px] pt-3 pb-3 py-4 gap-2 text-lg rounded-lg',
      },
    },
  },
);
