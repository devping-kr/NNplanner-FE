import Button, { ButtonProps } from '@/components/common/Button/Button';
import { Caption1Grey500 } from '@/components/common/Typography';

const MealDeleteButton = (props: ButtonProps) => {
  return (
    <Button variant='default' className='w-10 p-0' {...props}>
      <Caption1Grey500>삭제</Caption1Grey500>
    </Button>
  );
};

export default MealDeleteButton;
