import { VariantProps } from 'class-variance-authority';
import { Size } from '@/components/Selectbox';
import { selectButtonVariants } from '@/components/SelectButton/SelectButton.variant';

type SelectButtonProps = VariantProps<typeof selectButtonVariants> & {
  selectedOption: string | null;
  placeholder: string;
  size: Size;
  isOpen: boolean;
  onClick: () => void;
};

const SelectButton = ({
  selectedOption,
  placeholder,
  size,
  isOpen,
  onClick,
}: SelectButtonProps) => {
  return (
    <button
      className={selectButtonVariants({ size })}
      type='button'
      onClick={onClick}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
    >
      {selectedOption || placeholder}
    </button>
  );
};

export default SelectButton;
