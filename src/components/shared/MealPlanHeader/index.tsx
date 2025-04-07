import { SelectedCategory } from '@/type/menuCategory/category';
import Button from '@/components/common/Button/Button';
import { Selectbox } from '@/components/common/Selectbox';
import {
  PageHeaderTitle,
  Subtitle2Green500,
  Subtitle2Grey100,
  Subtitle2Grey900,
} from '@/components/common/Typography';

type MealPlanHeaderProps = {
  mealName: string;
  selectedCategory: SelectedCategory;
  handleEditMenu: () => void;
  handleCreateSurvey: () => void;
  handleSaveExcel: () => void;
  handleDeleteMealPlan: () => void;
};

const MealPlanHeader = ({
  mealName,
  selectedCategory,
  handleEditMenu,
  handleCreateSurvey,
  handleSaveExcel,
  handleDeleteMealPlan,
}: MealPlanHeaderProps) => {
  return (
    <div className='flex flex-col gap-6'>
      <PageHeaderTitle>{mealName}</PageHeaderTitle>
      <div className='flex w-full justify-between'>
        <div className='flex gap-4'>
          <Selectbox
            buttonSize='sm'
            bgColor='disabled'
            selectedValue={selectedCategory.majorCategory}
            readonly={true}
          />
          <Selectbox
            buttonSize='sm'
            bgColor='disabled'
            selectedValue={selectedCategory.minorCategory}
            readonly={true}
          />
          <Button variant='teritary' size='sm' onClick={handleEditMenu}>
            <Subtitle2Grey100>메뉴 수정</Subtitle2Grey100>
          </Button>
          <Button variant='grey' size='sm' onClick={handleDeleteMealPlan}>
            <Subtitle2Grey900>삭제</Subtitle2Grey900>
          </Button>
        </div>
        <div className='flex gap-2'>
          <Button variant='secondary' size='sm' onClick={handleCreateSurvey}>
            <Subtitle2Green500>설문 생성</Subtitle2Green500>
          </Button>
          <Button variant='secondary' size='sm' onClick={handleSaveExcel}>
            <Subtitle2Green500>엑셀 저장</Subtitle2Green500>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanHeader;
