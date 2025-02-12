import { SelectedCategory } from '@/type/menuCategory/category';
import { Selectbox } from '@/components/common/Selectbox';
import { PageHeaderTitle } from '@/components/common/Typography';

type MealPlanHeaderProps = {
  mealName: string;
  selectedCategory: SelectedCategory;
  handleResetMenu?: () => void;
  handleEditMenu?: () => void;
  handleCreateSurvey?: () => void;
  handleSaveExcel?: () => void;
  handleDeleteMenu?: () => void;
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
          selectedValue={selectedCategory.majorCategory}
          className='cursor-not-allowed focus:border-gray-300'
          readonly={true}
        />
        <Selectbox
          size='small'
          selectedValue={selectedCategory.minorCategory}
          className='cursor-not-allowed focus:border-gray-300'
          readonly={true}
        />
      </div>
    </div>
  );
};

export default MealPlanHeader;
