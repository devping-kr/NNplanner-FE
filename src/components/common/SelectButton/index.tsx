import { VariantProps } from 'class-variance-authority';

import { selectIconVariants } from '../Selectbox/Selectbox.variant';
import Icon from '@/components/common/Icon';
import { Size } from '@/components/common/Selectbox';
import { selectButtonVariants } from '@/components/common/SelectButton/SelectButton.variant';

type SelectButtonProps = VariantProps<typeof selectButtonVariants> & {
  selectedOption: string | null;
  placeholder: string;
  size: Size;
  isOpen: boolean;
  onClick: () => void;
};

const ICON_SIZE: Record<Size, number> = {
  small: 16,
  basic: 16,
  large: 20,
};

const SelectButton = ({
  selectedOption,
  placeholder,
  size,
  isOpen,
  onClick,
}: SelectButtonProps) => {
  const iconSize = ICON_SIZE[size];
  return (
    <button
      className={selectButtonVariants({ size })}
      type='button'
      onClick={onClick}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
    >
      <span>{selectedOption || placeholder}</span>
      <Icon
        className={selectIconVariants({ size })}
        name={isOpen ? 'arrowUp' : 'arrowDown'}
        width={iconSize}
        height={iconSize}
      />
    </button>
  );
};

export default SelectButton;
