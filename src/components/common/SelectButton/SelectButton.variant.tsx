import { cva } from 'class-variance-authority';

export const selectButtonVariants = cva(
  'w-fit border-[1px] border-gray-300 rounded-md bg-white-100 text-left text-nowrap focus:border-green-700 focus:outline-none',
  {
    variants: {
      size: {
        small: 'min-w-20 px-3 py-2 text-sm rounded-md pr-8',
        basic: 'min-w-24 px-5 py-3 text-basic rounded-lg pr-10',
        large: 'min-w-28 px-7 py-5 text-lg rounded-lg pr-12',
      },
      isError: {
        true: 'border-red-300',
      },
    },
  },
);
