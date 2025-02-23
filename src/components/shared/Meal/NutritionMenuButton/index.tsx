import { cn } from '@/utils/core';
import { Label1Black } from '@/components/common/Typography';
import MealEditButton from '@/components/shared/Meal/MealEditButton';

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
    <div className='flex w-full justify-between'>
      <button
        type='button'
        className={cn(
          'group flex w-full items-center justify-between gap-2 hover:cursor-pointer',
          className,
        )}
        onFocus={onFocus}
        onClick={onClick}
      >
        <div className='hidden h-4 w-1 bg-green-200 group-focus:flex'></div>
        <div className='flex w-full justify-between'>
          <Label1Black>{menuName}</Label1Black>
          <MealEditButton />
        </div>
      </button>
    </div>
  );
};

export default NutritionMenuButton;
