import { cn } from '@/utils/core';
import { optionListVariants } from '@/components/common/OptionList/OptionList.variant';
import { Option, Size } from '@/components/common/Selectbox';

type OptionListProps = {
  options: Option[];
  size: Size;
  onSelect: (value: string) => void;
};

const OptionList = ({ options, size, onSelect }: OptionListProps) => (
  <ul className={optionListVariants({ size })} role='listbox'>
    {options.map((option) => (
      <li
        key={option.value}
        className={cn(
          optionListVariants({ size }),
          'cursor-pointer rounded-md hover:bg-gray-100 active:bg-gray-200',
        )}
        onClick={() => onSelect(option.value)}
      >
        {option.label}
      </li>
    ))}
  </ul>
);
export default OptionList;
