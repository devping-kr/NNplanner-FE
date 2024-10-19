import { CardTitle } from '@/components/common/Typography';
import Card, {
  MealData,
} from '@/components/shared/Main/Cards/MainTopCard/Card';

interface Props {
  title: string;
  top3Data: MealData[];
}
const MainTopCard = ({ title, top3Data }: Props) => {
  return (
    <div className='flex w-full flex-col gap-3 rounded-md border border-gray-300 bg-white-100 p-4'>
      <CardTitle>{title}</CardTitle>
      <div className='flex w-full gap-2'>
        {top3Data.map((meal) => (
          <Card key={meal.date} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MainTopCard;
