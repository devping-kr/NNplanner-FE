import { cva } from 'class-variance-authority';

export const radioVariant = cva(
  'size-4 cursor-pointer appearance-none rounded-full border-[1.5px] border-input bg-transparent outline-none checked:border-[3px] checked:border-solid checked:border-transparent checked:bg-clip-padding disabled:cursor-default',
  {
    variants: {
      color: {
        primary: 'checked:bg-buttonPrimaryActive',
        secondary: 'checked:bg-buttonSecondaryActive',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
);
