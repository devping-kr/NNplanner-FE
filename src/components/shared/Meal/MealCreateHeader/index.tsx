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
    <div className='flex w-fit flex-col gap-4'>
      <Input
        className='text-2xl font-semibold'
        bgcolor='meal'
        height='large'
        value={inputValue}
      />
      <div className='flex gap-2'>
        <Selectbox
          size='basic'
          selectedValue={seletedCategory[0]}
          readonly={true}
        />
        <Selectbox
          size='basic'
          selectedValue={seletedCategory[1]}
          readonly={true}
        />
      </div>
    </div>
  );
};

export default MealCreateHeader;
