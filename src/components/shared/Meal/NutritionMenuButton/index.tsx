import { cn } from '@/utils/core';
import Icon from '@/components/common/Icon';
import { NutritionMenu } from '@/components/common/Typography';

type NutritionMenuButtonProps = {
  menuName: string;
  className?: string;
  onFocus: () => void;
  onClick: () => void;
};

const NutritionMenuButton = ({
  menuName,
  className,
  onFocus,
  onClick,
}: NutritionMenuButtonProps) => {
  return (
    <button
      type='button'
      className={cn(
        'flex w-full justify-between rounded-md p-2 transition duration-300 ease-in-out hover:bg-green-100 hover:text-gray-900 focus:bg-green-200 active:bg-green-200',
        className,
      )}
      onFocus={onFocus}
      onClick={onClick}
    >
      <NutritionMenu>{menuName}</NutritionMenu>
      <Icon name='edit' />
    </button>
  );
};

export default NutritionMenuButton;
