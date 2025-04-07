import { FoodInfo } from '@/type/menu/menuResponse';
import { Caption1Grey600 } from '@/components/common/Typography';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealTable from '@/components/shared/Meal/MealTable';

type NutritionInfoProps = {
  data: FoodInfo[];
};

const NutritionInfo = ({ data }: NutritionInfoProps) => {
  if (!data) return;

  return (
    <MealInfoContainer>
      <MealTable data={data} />
      <Caption1Grey600 className='text-right'>
        에너지(kcal) 탄수화물(g) 단백질(g) 지방(g)
      </Caption1Grey600>
      <KcalInfo data={data} />
    </MealInfoContainer>
  );
};

export default NutritionInfo;
