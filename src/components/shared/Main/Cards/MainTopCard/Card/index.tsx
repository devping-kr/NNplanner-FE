import { useState } from 'react';
import Item from '@/components/shared/Main/Cards/MainTopCard/Item';

export interface MealData {
  date: string;
  menu: string[];
}

const Card = ({ meal }: { meal: MealData }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='flex w-full flex-col items-center gap-2 rounded border border-gray-300 p-2 transition-all duration-300'>
      <span className='text-lg font-semibold underline'>{meal.date}</span>
      <div
        className={`grid w-full grid-cols-3 gap-x-2 gap-y-1 overflow-hidden transition-all duration-300 ${
          isHovered ? 'max-h-full' : 'max-h-[30px]'
        }`}
      >
        {meal.menu.map((menu, idx) => (
          <Item key={`${menu}-${idx}`} menu={menu} />
        ))}
      </div>
      {!isHovered && meal.menu.length > 3 && (
        <div
          className='cursor-pointer text-gray-500 underline hover:text-gray-600'
          onMouseDown={() => setIsHovered(!isHovered)}
        >
          +{meal.menu.length - 3} 더보기...
        </div>
      )}
      {isHovered && meal.menu.length > 3 && (
        <div
          className='cursor-pointer text-gray-500 underline hover:text-gray-600'
          onMouseDown={() => setIsHovered(!isHovered)}
        >
          최소화
        </div>
      )}
    </div>
  );
};

export default Card;
