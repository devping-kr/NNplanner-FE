'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo } from '@/type/mealType';
import { FoodInfo } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { isValidDateString } from '@/utils/calendar';
import InfoCard from '@/components/common/InfoCard';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader from '@/components/shared/Meal/MealHeader';
import { ORGANIZATIONS } from '@/constants/_getAllList/_categories';
import { INFOCARD_MESSAGE } from '@/constants/_infoCard';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { useToastStore } from '@/stores/useToastStore';

const MenualPlan = () => {
  // api로부터 전달받는 값
  const currentYear = 2024;
  const currentMonth = 9;

  const [totalMenuList, setTotalMenuList] = useState<CalendarInfo>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    majorCategory: '',
    minorCategory: '',
  });
  const [isCategoryError, setIsCategoryError] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      monthMenuName: '',
    },
  });

  const handleSaveMenu = (date: string, menuList: FoodInfo[]) => {
    setTotalMenuList((prevList) => ({
      ...prevList,
      [date]: {
        ...prevList[date],
        foods: [...menuList],
      },
    }));
  };

  const handleChangeCategory = (
    type: HandleChangeCategoryParam,
    value: string,
  ) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [type]: value,
    }));
    setIsCategoryError(false);
  };

  const handleDateClick = (date: string) => {
    if (isValidDateString(date)) setSelectedDate(date);
  };

  const handleResetMenu = () => {
    setTotalMenuList({});
    setSelectedDate('');
  };

  // TODO: 식단 이름, 카테고리, 전체 식단 제출 및 식단 조회로 이동
  const onSubmit = (data: { monthMenuName: string }) => {
    console.log(data);
    const { majorCategory, minorCategory } = selectedCategory;

    const isSelectedCategoryInvalid =
      majorCategory === '' || minorCategory === '';

    if (isSelectedCategoryInvalid) {
      showToast(MEAL_HEADER_ERROR.category.min, 'warning', 3000);
      setIsCategoryError(true);
      return;
    }
  };

  const onError = () => {
    if (errors.monthMenuName) {
      showToast(MEAL_HEADER_ERROR.name.min, 'warning', 3000);
      return;
    }
  };

  return (
    <div className='flex gap-8'>
      <MealForm
        legend={MEAL_FORM_LEGEND.menual.create}
        handleSubmit={handleSubmit(onSubmit, onError)}
      >
        <MealHeader
          categories={ORGANIZATIONS}
          register={register}
          errors={errors}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
          isCategoryError={isCategoryError}
          pageHeaderTitle={PAGE_TITLE.menualPlan.default}
        />
        <MealCalendar
          type='menualCreate'
          selectedCategory={selectedCategory}
          year={currentYear}
          month={currentMonth}
          data={totalMenuList}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
          handleSaveMenu={handleSaveMenu}
          handleResetMenu={handleResetMenu}
        />
      </MealForm>
      <div className='flex w-fit flex-col gap-2 pt-[166px]'>
        <InfoCard message={INFOCARD_MESSAGE.autoPlan.name} />
        <InfoCard message={INFOCARD_MESSAGE.autoPlan.category} />
      </div>
    </div>
  );
};

export default MenualPlan;
