import { FoodInfo } from '@/type/menu/menuResponse';
import { sumCalrories } from '@/utils/calendar';
import {
  SubTitle3Grey700,
  SubTitle3Green500,
} from '@/components/common/Typography';

type KcalInfoProps = {
  data: FoodInfo[];
};
const KcalInfo = ({ data }: KcalInfoProps) => {
  return (
    <div className='text-right'>
      <SubTitle3Grey700>총 </SubTitle3Grey700>
      <SubTitle3Green500>{sumCalrories(data)}kcal</SubTitle3Green500>
    </div>
  );
};

export default KcalInfo;
