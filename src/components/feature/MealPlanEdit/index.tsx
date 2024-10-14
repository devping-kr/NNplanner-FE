'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { FoodInfo } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { isValidDateString } from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader from '@/components/shared/Meal/MealHeader';
import { MOCK_NEW_CALENDAR_NUTRITION } from '@/constants/_calendarData';
import { ORGANIZATION_LIST } from '@/constants/_category';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { useToastStore } from '@/stores/useToastStore';

const MealPlanEdit = () => {
  // api로부터 전달 받는 값
  const mealName = '맛있는 9월 식단 야호';
  const currentYear = 2024;
  const currentMonth = 9;

  const [totalMenuList, setTotalMenuList] = useState(
    MOCK_NEW_CALENDAR_NUTRITION,
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    majorCategory: '',
    minorCategory: '',
  });
  const showToast = useToastStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      monthMenuName: mealName,
    },
  });

  const handleChangeMenu = (
    date: string,
    menuName: string,
    updatedItem: FoodInfo,
  ) => {
    setTotalMenuList((prevList) => {
      if (!prevList[date]) {
        return prevList;
      }

      return {
        ...prevList,
        [date]: {
          ...prevList[date],
          foods: prevList[date].foods.map((item) =>
            item.foodName === menuName ? { ...item, ...updatedItem } : item,
          ),
        },
      };
    });
  };

  const handleChangeCategory = (
    type: HandleChangeCategoryParam,
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
    setTotalMenuList(MOCK_NEW_CALENDAR_NUTRITION);
    setSelectedDate('');
  };

  const onSubmit = (data: { monthMenuName: string }) => {
    // 선택한 카테고리 + 식단이름 제출 + 식단 리스트로 이동
    console.log(data);
  };

  const onError = () => {
    if (errors.monthMenuName) {
      showToast(MEAL_HEADER_ERROR.name.min, 'warning', 3000);
      return;
    }
  };

  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.mealPlan.edit}
      handleSubmit={handleSubmit(onSubmit, onError)}
    >
      <MealHeader
        // TODO: 실 카테고리로 변경
        categories={ORGANIZATION_LIST}
        register={register}
        errors={errors}
        selectedCategory={selectedCategory}
        handleChangeCategory={handleChangeCategory}
        pageHeaderTitle={PAGE_TITLE.mealPlan.edit}
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
    </MealForm>
  );
};

export default MealPlanEdit;
