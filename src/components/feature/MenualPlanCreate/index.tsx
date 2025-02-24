'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { MajorCategory } from '@/type/menu/menuRequest';
import { FailResponse } from '@/type/response';
import {
  getCurrentYearMonthNow,
  transformCalendarToPostSave,
} from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealCreateHeader from '@/components/shared/Meal/MealCreateHeader';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_CREATE_MESSAGE } from '@/constants/_toastMessage';
import { usePostMonthMenusSave } from '@/hooks/menu/usePostMonthMenusSave';
import useNavigate from '@/hooks/useNavigate';
import { useMenualPlanStore } from '@/stores/useMenualPlanStore';
import { useToastStore } from '@/stores/useToastStore';

const MenualPlanCreate = () => {
  const { year, month } = getCurrentYearMonthNow();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const showToast = useToastStore((state) => state.showToast);
  const { monthMenuName, category, calendar } = useMenualPlanStore((state) => ({
    monthMenuName: state.monthMenuName,
    category: state.category,
    calendar: state.calendar,
  }));
  const { navigate } = useNavigate();
  const { mutate: postSaveMutate } = usePostMonthMenusSave();

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleEditMenu = () => {
    navigate(ROUTES.EDIT.MENUAL);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedData = transformCalendarToPostSave(
      calendar,
      monthMenuName,
      category.majorCategory as MajorCategory,
      category.minorCategory,
    );
    postSaveMutate(formattedData, {
      onSuccess: () => {
        showToast(
          `${year}년 ${month}월 ${MEAL_CREATE_MESSAGE.success.saveMeal}`,
          'success',
        );
        navigate(ROUTES.VIEW.PLAN);
      },
      onError: (error: AxiosError<FailResponse>) => {
        const errorMessage =
          error?.response?.data?.message || '수동 식단 저장 실패';
        showToast(errorMessage, 'warning', 1000);
      },
    });
  };

  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.menual.create}
      handleSubmit={handleSubmit}
    >
      <MealCreateHeader
        type='create'
        pageHeaderTitle={PAGE_TITLE.menualPlan.default}
        inputValue={monthMenuName}
        selectedCategory={category}
        handleEditMenu={handleEditMenu}
      />
      <MealCalendar
        type='create'
        data={calendar}
        year={year}
        month={month}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
    </MealForm>
  );
};

export default MenualPlanCreate;
