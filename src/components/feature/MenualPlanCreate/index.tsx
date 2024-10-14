'use client';

import { useState } from 'react';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealCreateHeader from '@/components/shared/Meal/MealCreateHeader';
import { MOCK_NEW_CALENDAR_NUTRITION } from '@/constants/_calendarData';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { PAGE_TITLE } from '@/constants/_pageTitle';

const MenualPlanCreate = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const { year } = getCurrentYearMonthNow();

  // 임시 데이터
  const month = 9;

  // api로부터 전달받은 식단 이름, 카테고리
  const mealName = '맛있는 9월 식단';
  const selectedCategory = ['카테고리1', '카테고리2'];

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 가지고 있는 식단 데이터 전송
  };

  //   TODO : form fieldset legend 컴포넌트로 분리, date 유틸로 분리
  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.menual.create}
      handleSubmit={handleSubmit}
    >
      <MealCreateHeader
        pageHeaderTitle={PAGE_TITLE.menualPlan.create}
        inputValue={mealName}
        selectedCategory={selectedCategory}
      />
      <MealCalendar
        type='create'
        data={MOCK_NEW_CALENDAR_NUTRITION}
        year={year}
        month={month}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
    </MealForm>
  );
};

export default MenualPlanCreate;
