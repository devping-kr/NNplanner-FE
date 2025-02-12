import { cn } from '@/utils/core';
import { SubTitle1Black } from '@/components/common/Typography';
import Card, {
  MealData,
} from '@/components/shared/Main/Cards/MainTopCard/Card';

interface Props {
  title: string;
  top3Data: MealData[];
}
const MainTopCard = ({ title, top3Data }: Props) => {
  return (
    <div className='flex h-[342px] w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
      <SubTitle1Black>{title}</SubTitle1Black>
      <div className='flex w-full gap-2'>
        {top3Data.map((meal, index) => (
          <div
            key={meal.date}
            className={cn(
              'w-full',
              index === 0 ? 'pr-4' : 'border-l border-grey-100 px-4',
            )}
          >
            <Card meal={meal} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainTopCard;
