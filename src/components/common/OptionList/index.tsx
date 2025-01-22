import { cn } from '@/utils/core';
import {
  optionListLiVariants,
  optionListUlVariants,
} from '@/components/common/OptionList/OptionList.variant';
import { Option, Size } from '@/components/common/Selectbox';

type OptionListProps = {
  options: Option[];
  size: Size;
  onSelect: (value: string) => void;
};

const OptionList = ({ options, size, onSelect }: OptionListProps) => (
  <ul
    className={cn(
      optionListUlVariants({ size }),
      'flex h-full w-full flex-col',
    )}
    role='listbox'
  >
    {options.map((option) => (
      <li
        key={option.value}
        className={cn(
          optionListLiVariants({ size }),
          'cursor-pointer px-4 py-3 hover:bg-gray-50 active:bg-white-100 active:text-green-500',
        )}
        onClick={() => onSelect(option.value)}
      >
        {option.label}
      </li>
    ))}
  </ul>
);
export default OptionList;
