import { Selectbox } from '@/components/common/Selectbox';
import { PageHeaderTitle } from '@/components/common/Typography';

type MealPlanHeaderProps = {
  mealName: string;
  selectedCategory: string[];
};

const MealPlanHeader = ({
  mealName,
  selectedCategory,
}: MealPlanHeaderProps) => {
  return (
    <div className='flex items-center gap-2'>
      <PageHeaderTitle>{mealName}</PageHeaderTitle>
      <div className='flex gap-2'>
        <Selectbox
          size='small'
          selectedValue={selectedCategory[0]}
          className='cursor-not-allowed focus:border-gray-300'
          readonly={true}
        />
        <Selectbox
          size='small'
          selectedValue={selectedCategory[1]}
          className='cursor-not-allowed focus:border-gray-300'
          readonly={true}
        />
      </div>
    </div>
  );
};

export default MealPlanHeader;