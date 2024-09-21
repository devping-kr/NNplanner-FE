import { sumCalrories } from '@/utils/calendar';
import { NutritionMenu } from '@/components/common/Typography';
import { NutritionData } from '@/components/shared/Meal/NutritionInfo';

type KcalInfoProps = {
  data: NutritionData[];
};
const KcalInfo = ({ data }: KcalInfoProps) => {
  return (
    <div className='text-right'>
      <NutritionMenu>총 칼로리 : {sumCalrories(data)}kcal</NutritionMenu>
    </div>
  );
};

export default KcalInfo;
