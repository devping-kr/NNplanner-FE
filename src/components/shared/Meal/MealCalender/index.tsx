'use client';

import Calendar, { CalendarProps } from '@/components/common/Calendar';
import { MealCalenderTitle } from '@/components/common/Typography';
import MealHeaderButton from '@/components/shared/Meal/MealHeaderButton';

type MealCalendarProps = {
  type?: 'default' | 'create' | 'edit';
  selectedCategory: {
    organization: string | null;
    organizationDetail: string | null;
  };
  isValid: boolean;
} & CalendarProps;

const MealCalendar = ({
  type = 'default',
  selectedCategory,
  isValid,
  year,
  month,
  data,
  readonly,
  onDateClick,
}: MealCalendarProps) => {
  const isCategoryEmpty =
    !selectedCategory?.organization || !selectedCategory?.organizationDetail;

  return (
    <div className='flex w-fit flex-col gap-4'>
      <div className='flex w-full justify-between'>
        <MealCalenderTitle>{month}월</MealCalenderTitle>
        {type === 'default' && (
          <MealHeaderButton disabled={isCategoryEmpty || !isValid}>
            생성
          </MealHeaderButton>
        )}
        {type === 'create' && (
          <div className='flex w-fit gap-2'>{/* 추후 추가 예정 */}</div>
        )}
      </div>
      <Calendar
        year={year}
        month={month}
        data={data}
        readonly={readonly}
        onDateClick={onDateClick}
      />
    </div>
  );
};

export default MealCalendar;
