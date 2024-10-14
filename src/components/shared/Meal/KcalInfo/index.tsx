import { FoodInfo } from '@/type/menu/menuResponse';
import { sumCalrories } from '@/utils/calendar';
import { NutritionMenu } from '@/components/common/Typography';

type KcalInfoProps = {
  data: FoodInfo[];
};
const KcalInfo = ({ data }: KcalInfoProps) => {
  return (
    <div className='text-right'>
      <NutritionMenu>총 칼로리 : {sumCalrories(data)}kcal</NutritionMenu>
    </div>
  );
};

export default KcalInfo;
