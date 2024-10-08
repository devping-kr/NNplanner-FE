import Item from '@/components/shared/Main/Cards/MainTopCard/Item';

export interface MealData {
  date: string;
  menu: string[];
}

const Card = ({ meal }: { meal: MealData }) => {
  return (
    <div className='flex w-full flex-col items-center gap-2 rounded border border-gray-300 p-2'>
      <span className='text-lg font-semibold underline'>{meal.date}</span>
      <div className='grid grid-cols-3 gap-x-8 gap-y-1'>
        {meal.menu.map((menu, idx) => (
          <Item key={`${menu}-${idx}`} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default Card;
