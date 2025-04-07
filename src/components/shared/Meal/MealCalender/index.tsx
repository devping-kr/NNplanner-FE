'use client';

import { CalendarType } from '@/type/calendar';
import { FoodInfo } from '@/type/menu/menuResponse';
import { SelectedCategory } from '@/type/menuCategory/category';
import { cn } from '@/utils/core';
import Calendar, { CalendarProps } from '@/components/common/Calendar';
import InfoCard from '@/components/common/InfoCard';
import { H1Black } from '@/components/common/Typography';
import MealCreate from '@/components/shared/Meal/MealCreate';
import MealEdit from '@/components/shared/Meal/MealEdit';
import NutritionInfo from '@/components/shared/Meal/NutritionInfo';
import { INFOCARD_MESSAGE } from '@/constants/_infoCard';

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
  const renderContent = () => {
    if (!selectedDate || !data) return null;

    switch (type) {
      case 'create':
      case 'mealPlan':
        if (!data[selectedDate]?.foods) {
          return null;
        } else {
          return <NutritionInfo data={data[selectedDate].foods} />;
        }
      case 'edit':
        return (
          <MealEdit
            date={selectedDate}
            data={data[selectedDate]?.foods}
            handleChangeMenu={handleChangeMenu}
          />
        );
      case 'menualCreate':
        return (
          <MealCreate date={selectedDate} handleSaveMenu={handleSaveMenu} />
        );
      default:
        return null;
    }
  };

  const renderInfocard = () => {
    if (type === 'mealPlan') return null;

    return (
      <div className='flex flex-col gap-4'>
        <InfoCard message={INFOCARD_MESSAGE.autoPlan.name} />
        <InfoCard message={INFOCARD_MESSAGE.autoPlan.category} />
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex w-full gap-6',
        type === 'mealPlan' && !renderContent() && 'gap-0',
      )}
    >
      <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
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
      <div className='flex flex-col gap-4'>
        {renderContent()}
        {renderInfocard()}
      </div>
    </div>
  );
};

export default MealCalendar;
