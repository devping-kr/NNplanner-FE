import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';

type MealCreateHeaderProps = {
  inputValue: string;
  seletedCategory: string[];
};

const MealCreateHeader = ({
  inputValue,
  seletedCategory,
}: MealCreateHeaderProps) => {
  return (
    <div className='flex w-fit items-center gap-4'>
      <Input
        className='text-2xl font-semibold focus:border-green-400'
        bgcolor='meal'
        height='large'
        value={inputValue}
      />
      <div className='flex gap-2'>
        <Selectbox
          size='basic'
          selectedValue={seletedCategory[0]}
          className='cursor-not-allowed focus:border-gray-300'
          readonly={true}
        />
        <Selectbox
          size='basic'
          selectedValue={seletedCategory[1]}
          className='cursor-not-allowed focus:border-gray-300'
          readonly={true}
        />
      </div>
    </div>
  );
};

export default MealCreateHeader;
