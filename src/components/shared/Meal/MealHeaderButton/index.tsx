import { ComponentPropsWithoutRef } from 'react';
import Button from '@/components/common/Button/Button';

type MealHeaderButtonProps = {
  disabled: boolean;
} & ComponentPropsWithoutRef<'button'>;
const MealHeaderButton = ({ disabled, ...props }: MealHeaderButtonProps) => {
  return (
    <Button
      size='large'
      className='h-10 w-fit'
      disabled={disabled}
      type='submit'
      {...props}
    />
  );
};

export default MealHeaderButton;
