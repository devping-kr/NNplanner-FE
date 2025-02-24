'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo } from '@/type/mealType';
import { MajorCategory } from '@/type/menu/menuRequest';
import { MenuResponse } from '@/type/menu/menuResponse';
import { SelectedCategory } from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import {
  getCurrentYearMonthNow,
  transformResponseToCalendar,
  transformCalendarToPostSave,
  isAllFoodsEmpty,
} from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealCreateHeader from '@/components/shared/Meal/MealCreateHeader';
import { MealHeaderFormData } from '@/components/shared/Meal/MealHeader';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { usePostMonthMenusSave } from '@/hooks/menu/usePostMonthMenusSave';
import useNavigate from '@/hooks/useNavigate';
import { useAutoPlanStore } from '@/stores/useAutoPlanStore';
import { useToastStore } from '@/stores/useToastStore';

const AutoPlanCreate = () => {
  const [calendarData, setCalendarData] = useState<CalendarInfo>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    majorCategory: '',
    minorCategory: '',
  });
  const { year, month } = getCurrentYearMonthNow();
  const showToast = useToastStore((state) => state.showToast);
  const { navigate } = useNavigate();
  const { setMonthMenuName, category } = useAutoPlanStore((state) => ({
    category: state.category,
    setMonthMenuName: state.setMonthMenuName,
  }));

  const queryClient = useQueryClient();
  const { mutate: postSaveMutate } = usePostMonthMenusSave();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<MealHeaderFormData>({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
  });

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleEditMenu = () => {
    const inputData = getValues();
    setMonthMenuName(inputData.monthMenuName);
    navigate(ROUTES.EDIT.AUTO);
  };

  const onSubmit = (data: MealHeaderFormData) => {
    if (isAllFoodsEmpty(calendarData)) {
      showToast('빈 식단은 생성할 수 없습니다.', 'warning', 3000);
      return;
    }

    const formattedData = transformCalendarToPostSave(
      calendarData,
      data.monthMenuName,
      selectedCategory.majorCategory as MajorCategory,
      selectedCategory.minorCategory,
    );
    postSaveMutate(formattedData, {
      onSuccess: ({ message }: Result<null>) => {
        showToast(message, 'success', 1000);
        navigate(ROUTES.VIEW.PLAN);
      },
      onError: (error: AxiosError<FailResponse>) => {
        const errorMessage =
          error?.response?.data?.message || '자동 식단 저장 실패';
        showToast(errorMessage, 'warning', 1000);
      },
    });
  };

  const onError = () => {
    if (errors.monthMenuName) {
      showToast(MEAL_HEADER_ERROR.name.min, 'warning', 3000);
      return;
    }
  };

  useEffect(() => {
    const menus = queryClient.getQueryData<MenuResponse[]>(['monthMenusAuto']);
    if (!menus) return;
    const calendarData = transformResponseToCalendar(year, month, menus);
    setSelectedCategory({
      majorCategory: category.majorCategory,
      minorCategory: category.minorCategory,
    });
    setCalendarData(calendarData);
  }, [
    year,
    month,
    queryClient,
    category.majorCategory,
    category.minorCategory,
  ]);

  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.autoPlan.create}
      handleSubmit={handleSubmit(onSubmit, onError)}
    >
      <MealCreateHeader
        pageHeaderTitle={PAGE_TITLE.autoPlan.default}
        selectedCategory={selectedCategory}
        type='create'
        inputValue={getValues().monthMenuName}
        register={register}
        handleEditMenu={handleEditMenu}
        errors={errors}
      />
      <MealCalendar
        type='create'
        data={calendarData}
        year={year}
        month={month}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
    </MealForm>
  );
};

export default AutoPlanCreate;
