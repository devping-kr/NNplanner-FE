import { Subtitle2Black } from '@/components/common/Typography';

type MealInfoContainerProps = {
  children: React.ReactNode;
  date: string;
};

const MealInfoContainer = ({ children, date }: MealInfoContainerProps) => {
  return (
    <div className='top-[246px] flex h-fit w-80 flex-col gap-6 rounded-2xl bg-white-100 p-4 pr-8'>
      <Subtitle2Black>{date}</Subtitle2Black>
      {children}
    </div>
  );
};

export default MealInfoContainer;
