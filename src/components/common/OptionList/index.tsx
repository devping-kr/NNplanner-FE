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
  <ul className={optionListUlVariants({ size })} role='listbox'>
    {options.map((option) => (
      <li
        key={option.value}
        className={optionListLiVariants({ size })}
        onClick={() => onSelect(option.value)}
      >
        {option.label}
      </li>
    ))}
  </ul>
);
export default OptionList;
