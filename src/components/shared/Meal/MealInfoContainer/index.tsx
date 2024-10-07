import { NutritionDate } from '@/components/common/Typography';

type MealInfoContainerProps = {
  children: React.ReactNode;
  date: string;
};

const MealInfoContainer = ({ children, date }: MealInfoContainerProps) => {
  return (
    <div className='fixed right-6 top-[10px] flex h-fit w-80 flex-col gap-1 rounded-md border-[1px] border-green-400 bg-white-100 p-4'>
      <div className='text-center'>
        <NutritionDate>{date}</NutritionDate>
      </div>
      {children}
    </div>
  );
};

export default MealInfoContainer;
