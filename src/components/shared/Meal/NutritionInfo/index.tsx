import { NutritionEtc } from '@/components/common/Typography';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealTable from '@/components/shared/Meal/MealTable';

export type NutritionData = {
  foodId: string;
  foodName: string;
  kcal: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};

type NutritionInfoProps = {
  date: string;
  data: NutritionData[];
};

const NutritionInfo = ({ date, data }: NutritionInfoProps) => {
  if (!data) return;

  return (
    <MealInfoContainer date={date}>
      <MealTable data={data} />
      <div className='text-right'>
        <NutritionEtc>에너지(kcal) 탄수화물(g) 단백질(g) 지방(g)</NutritionEtc>
      </div>
      <div className='text-right'>
        <KcalInfo data={data} />
      </div>
    </MealInfoContainer>
  );
};

export default NutritionInfo;
