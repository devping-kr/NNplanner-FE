import { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import Icon from '@/components/common/Icon';
import { BgColor, ButtonSize, Size } from '@/components/common/Selectbox';
import { selectIconVariants } from '@/components/common/Selectbox/Selectbox.variant';
import {
  selectButtonVariants,
  typoVariants,
} from '@/components/common/SelectButton/SelectButton.variant';

type SelectButtonProps = VariantProps<typeof selectButtonVariants> & {
  selectedOption: string | null;
  placeholder: string;
  buttonSize: ButtonSize;
  bgColor: BgColor;
  isOpen: boolean;
  className?: string;
  isError?: boolean;
  onClick: () => void;
  // 리디자인 완성 시 삭제
  size?: Size;
};

const SelectButton = ({
  selectedOption,
  placeholder,
  buttonSize,
  bgColor,
  isOpen,
  className,
  isError = false,
  onClick,
  size,
}: SelectButtonProps) => {
  const iconSize = buttonSize === 'sm' ? 20 : 24;

  return (
    <button
      className={cn(
        selectButtonVariants({ size, buttonSize, bgColor, isError }),
        className,
      )}
      type='button'
      onClick={onClick}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
    >
      <span
        className={typoVariants({
          buttonSize,
          state: selectedOption ? 'selected' : 'placeholder',
        })}
      >
        {selectedOption || placeholder}
      </span>
      <Icon
        className={selectIconVariants({ size })}
        name={isOpen ? 'arrowUp' : 'arrowDown'}
        color='black'
        width={iconSize}
        height={iconSize}
      />
    </button>
  );
};

export default SelectButton;
