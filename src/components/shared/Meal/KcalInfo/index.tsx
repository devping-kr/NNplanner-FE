import { FoodInfo } from '@/type/menu/menuResponse';
import { sumCalrories } from '@/utils/calendar';
import {
  Subtitle2Black,
  Subtitle2Green500,
} from '@/components/common/Typography';

type KcalInfoProps = {
  data: FoodInfo[];
};
const KcalInfo = ({ data }: KcalInfoProps) => {
  return (
    <div className='text-right'>
      <Subtitle2Black>총 칼로리 : </Subtitle2Black>
      <Subtitle2Green500>{sumCalrories(data)}kcal</Subtitle2Green500>
    </div>
  );
};

export default KcalInfo;
