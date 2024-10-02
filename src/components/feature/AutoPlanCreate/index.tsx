'use client';

import { useState } from 'react';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealCreateHeader from '@/components/shared/Meal/MealCreateHeader';
import { MOCK_CALENDAR_NUTRITION } from '@/constants/_calendarData';

const AutoPlanCreate = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const now = new Date();
  const year = now.getFullYear();
  // const month = now.getMonth() + 1;

  // 임시 데이터
  const month = 9;

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 가지고 있는 식단 데이터 전송
  };

  // api로부터 전달받은 식단 이름, 카테고리
  const mealName = '맛있는 9월 식단';
  const seletedCategory = ['카테고리1', '카테고리2'];

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='flex w-fit flex-col gap-4'>
        <legend className='sr-only'>자동 식단 이름 및 카테고리 등록</legend>
        <MealCreateHeader
          inputValue={mealName}
          seletedCategory={seletedCategory}
        />
        <MealCalendar
          type='create'
          data={MOCK_CALENDAR_NUTRITION}
          year={year}
          month={month}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
      </fieldset>
    </form>
  );
};

export default AutoPlanCreate;
