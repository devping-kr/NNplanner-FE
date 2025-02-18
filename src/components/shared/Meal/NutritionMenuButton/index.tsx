import { cn } from '@/utils/core';
import { Caption1Grey500, Label1Black } from '@/components/common/Typography';

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
        'flex w-full items-center justify-between hover:cursor-pointer',
        className,
      )}
      onFocus={onFocus}
      onClick={onClick}
    >
      <Label1Black>{menuName}</Label1Black>
      <Caption1Grey500>삭제</Caption1Grey500>
    </button>
  );
};

export default NutritionMenuButton;
