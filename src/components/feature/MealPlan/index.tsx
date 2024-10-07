'use client';

import { useState } from 'react';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealPlanHeader from '@/components/shared/MealPlanHeader';
import { MOCK_CALENDAR_NUTRITION } from '@/constants/_calendarData';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';

const MealPlan = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const { year } = getCurrentYearMonthNow();

  // 임시 데이터
  const month = 9;

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 엑셀 저장
  };

  // api로부터 전달받은 식단 이름, 카테고리
  const mealName = '맛있는 9월 식단';
  const selectedCategory = ['카테고리1', '카테고리2'];

  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.autoPlan.create}
      handleSubmit={handleSubmit}
    >
      <MealPlanHeader mealName={mealName} selectedCategory={selectedCategory} />
      <MealCalendar
        type='mealPlan'
        data={MOCK_CALENDAR_NUTRITION}
        year={year}
        month={month}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
    </MealForm>
  );
};

export default MealPlan;
