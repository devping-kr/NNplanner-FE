import Button, { ButtonProps } from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';

const BUTTON_SIZE = 16;

const MealEditButton = (props: ButtonProps) => {
  return (
    <Button variant='default' className='w-fit p-0' {...props}>
      <Icon
        name='pencil'
        width={BUTTON_SIZE}
        height={BUTTON_SIZE}
        color='grey300'
      />
    </Button>
  );
};

export default MealEditButton;
