'use client';

import { CalendarType } from '@/type/calendar';
import { FoodInfo } from '@/type/menu/menuResponse';
import { SelectedCategory } from '@/type/menuCategory/category';
import Calendar, { CalendarProps } from '@/components/common/Calendar';
import InfoCard from '@/components/common/InfoCard';
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
  handleDeleteMenu?: (date: string, foodId: string) => void;
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
  handleResetMenu,
  handleDeleteMenu,
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
        <div className='flex flex-col gap-4'>
          <MealEdit
            date={selectedDate}
            data={data[selectedDate]?.foods}
            handleChangeMenu={handleChangeMenu}
            handleResetMenu={handleResetMenu}
            handleDeleteMenu={handleDeleteMenu}
          />
          <div className='flex flex-col gap-4'>
            <InfoCard message='날짜를 누른 후 메뉴 검색을 통해 편하게 식단을 만들 수 있습니다.' />
            <InfoCard message='선택한 카테고리로 식단들을 저장하고 관리할 수 있습니다.' />
          </div>
        </div>
      )}
      {selectedDate && type === 'menualCreate' && (
        <MealCreate date={selectedDate} handleSaveMenu={handleSaveMenu} />
      )}
    </div>
  );
};

export default MealCalendar;
