import { cn } from '@/utils/core';
import { Label1Black } from '@/components/common/Typography';

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
        'flex w-fit items-center justify-between hover:cursor-pointer',
        className,
      )}
      onFocus={onFocus}
      onClick={onClick}
    >
      <Label1Black>{menuName}</Label1Black>
    </button>
  );
};

export default NutritionMenuButton;
