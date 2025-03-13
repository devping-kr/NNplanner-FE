import { cn } from '@/utils/core';
import { Label1Black } from '@/components/common/Typography';
import MealEditButton from '@/components/shared/Meal/MealEditButton';

type NutritionMenuButtonProps = {
  menuName: string;
  isFocused: boolean;
  className?: string;
  onFocus: () => void;
  onClick: () => void;
};

const NutritionMenuButton = ({
  menuName,
  className,
  isFocused,
  onFocus,
  onClick,
}: NutritionMenuButtonProps) => {
  return (
    <div className='flex w-full justify-between'>
      <div
        className={cn(
          'group flex w-full items-center justify-between gap-2',
          className,
        )}
      >
        <div
          className={cn('h-4 w-1 bg-green-200', isFocused ? 'flex' : 'hidden')}
        ></div>
        <div className='flex w-full justify-between'>
          <Label1Black>{menuName}</Label1Black>
          <MealEditButton onClick={onClick} onFocus={onFocus} />
        </div>
      </div>
    </div>
  );
};

export default NutritionMenuButton;
