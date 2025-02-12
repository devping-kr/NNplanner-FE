import Badge from '@/components/common/Badge';
import { Label1Black } from '@/components/common/Typography';
import Item from '@/components/shared/Main/Cards/MainTopCard/Item';

export interface MealData {
  date: string;
  menu: string[];
}

const Card = ({ meal, index }: { meal: MealData; index: number }) => {
  return (
    <div className='flex w-full flex-col items-center gap-4'>
      <div className='flex w-full items-center gap-6'>
        <Badge
          text={`Top ${index + 1}`}
          textType='subtitle'
          variant='default'
          size='m'
        />
        <Label1Black>{meal.date}</Label1Black>
      </div>
      <div className='flex w-full flex-col items-center'>
        {meal.menu.map((menu, idx) => (
          <Item key={`${menu}-${idx}`} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default Card;
