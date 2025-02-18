'use client';

import { CalendarType } from '@/type/calendar';
import { FoodInfo } from '@/type/menu/menuResponse';
import { SelectedCategory } from '@/type/menuCategory/category';
import Calendar, { CalendarProps } from '@/components/common/Calendar';
import { H1Black } from '@/components/common/Typography';
import MealCreate from '@/components/shared/Meal/MealCreate';
import MealEdit from '@/components/shared/Meal/MealEdit';
import NutritionInfo from '@/components/shared/Meal/NutritionInfo';

type MealCalendarProps = {
  type?: CalendarType;
  selectedCategory?: SelectedCategory;
  selectedDate?: string;
  handleChangeMenu?: (
    date: string,
    menuName: string,
    updatedItem: FoodInfo,
    type: 'edit' | 'add',
  ) => void;
  handleSaveMenu?: (date: string, menuList: FoodInfo[]) => void;
  handleResetMenu?: () => void;
} & CalendarProps;

const MealCalendar = ({
  type = 'default',
  selectedDate = '',
  year,
  month,
  data,
  readonly,
  onDateClick,
  handleChangeMenu,
  handleSaveMenu,
}: MealCalendarProps) => {
  return (
    <div className='flex gap-6'>
      <div className='flex w-fit flex-col gap-6 rounded-2xl bg-white-100 p-6'>
        <div className='flex w-full items-center justify-between'>
          <H1Black>{month}월</H1Black>
        </div>
        <Calendar
          year={year}
          month={month}
          data={data}
          readonly={readonly}
          onDateClick={onDateClick}
        />
      </div>
      {selectedDate && (type === 'create' || type === 'mealPlan') && data && (
        <NutritionInfo date={selectedDate} data={data[selectedDate]?.foods} />
      )}
      {selectedDate && type === 'edit' && data && (
        <MealEdit
          date={selectedDate}
          data={data[selectedDate]?.foods}
          handleChangeMenu={handleChangeMenu}
        />
      )}
      {selectedDate && type === 'menualCreate' && (
        <MealCreate date={selectedDate} handleSaveMenu={handleSaveMenu} />
      )}
    </div>
  );
};

export default MealCalendar;
