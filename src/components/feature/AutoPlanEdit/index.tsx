'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { isValidDateString } from '@/utils/calendar';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader from '@/components/shared/Meal/MealHeader';
import { NutritionData } from '@/components/shared/Meal/NutritionInfo';
import { MOCK_CALENDAR_NUTRITION } from '@/constants/_calendarData';
import { MOCK_CATEGORY_LIST } from '@/constants/_category';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { useToastStore } from '@/stores/useToastStore';

const AutoPlanEdit = () => {
  // api로부터 전달 받는 값
  const mealName = '맛있는 9월 식단 야호';
  const category = {
    organization: '학교명',
    organizationDetail: '냠냠초등학교',
  };
  const currentYear = 2024;
  const currentMonth = 9;

  const [totalMenuList, setTotalMenuList] = useState(MOCK_CALENDAR_NUTRITION);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState({
    organization: category.organization,
    organizationDetail: category.organizationDetail,
  });
  const { showToast } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      name: mealName,
    },
  });

  const handleChangeMenu = (
    date: string,
    menuName: string,
    updatedItem: NutritionData,
  ) => {
    setTotalMenuList((prevList) => {
      const updatedList = { ...prevList };

      if (updatedList[date]) {
        updatedList[date] = updatedList[date].map((item) =>
          item.content === menuName ? { ...item, ...updatedItem } : item,
        );
      }
      return updatedList;
    });
  };

  const handleChangeCategory = (
    type: 'organization' | 'organizationDetail',
    value: string,
  ) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleDateClick = (date: string) => {
    if (isValidDateString(date)) setSelectedDate(date);
  };

  const handleResetMenu = () => {
    // 메뉴 초기화 클릭 시 실행
    setTotalMenuList(MOCK_CALENDAR_NUTRITION);
    setSelectedDate('');
  };

  const onSubmit = (data: { name: string }) => {
    // 선택한 카테고리 + 식단이름 제출 + 식단 리스트로 이동
    console.log(data);
  };

  const onError = () => {
    const hasInputError = !!errors.name?.message;

    if (hasInputError) {
      showToast(MEAL_HEADER_ERROR.name.min, 'warning', 3000);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset className='flex w-fit flex-col gap-4'>
        <legend className='sr-only'>자동 식단 이름 및 카테고리 수정</legend>
        <MealHeader
          categories={MOCK_CATEGORY_LIST}
          register={register}
          errors={errors}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
          isPageEdit
        />
        <MealCalendar
          type='edit'
          year={currentYear}
          month={currentMonth}
          data={totalMenuList}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
          handleChangeMenu={handleChangeMenu}
          handleResetMenu={handleResetMenu}
        />
      </fieldset>
    </form>
  );
};

export default AutoPlanEdit;
