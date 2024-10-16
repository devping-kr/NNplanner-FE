'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo } from '@/type/mealType';
import { MajorCategory } from '@/type/menu/menuRequest';
import { FoodInfo, HospitalMenu } from '@/type/menu/menuResponse';
import { SelectedCategory } from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import {
  getCurrentYearMonthNow,
  isValidDateString,
  transformResponseToCalendar,
  transformCalendarToPostSave,
} from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealCreateHeader from '@/components/shared/Meal/MealCreateHeader';
import { MealHeaderFormData } from '@/components/shared/Meal/MealHeader';
import { MAJOR_CATEGORIES } from '@/constants/_meal';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { usePostMonthMenusSave } from '@/hooks/menu/usePostMonthMenusSave';
import useNavigate from '@/hooks/useNavigate';
import { useAutoPlanStore } from '@/stores/useAutoPlanStore';
import { useToastStore } from '@/stores/useToastStore';

const AutoPlanEdit = () => {
  const [calendarData, setCalendarData] = useState<CalendarInfo>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    majorCategory: '',
    minorCategory: '',
  });
  const { year, month } = getCurrentYearMonthNow();
  const showToast = useToastStore((state) => state.showToast);
  const { navigate } = useNavigate();
  const monthMenuName = useAutoPlanStore((state) => state.monthMenuName);

  const queryClient = useQueryClient();
  const { mutate: postSaveMutate } = usePostMonthMenusSave();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealHeaderFormData>({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      monthMenuName: monthMenuName,
    },
  });

  const handleChangeMenu = (
    date: string,
    menuName: string,
    updatedItem: FoodInfo,
  ) => {
    setCalendarData((prevList) => {
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

  const handleDateClick = (date: string) => {
    if (isValidDateString(date)) setSelectedDate(date);
  };

  const handleResetMenu = () => {
    getOriginalCalendar();
    setSelectedDate('');
  };

  const onSubmit = (data: MealHeaderFormData) => {
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

  const getOriginalCalendar = () => {
    const menus = queryClient.getQueryData<HospitalMenu[]>(['monthMenusAuto']);
    if (!menus) return;
    const calendarData = transformResponseToCalendar(year, month, menus);
    if (menus[0].hospitalMenuKind) {
      // TODO: 학교 menuKind도 받을 수 있게 수정
      setSelectedCategory({
        majorCategory: MAJOR_CATEGORIES[2],
        minorCategory: menus[0].hospitalMenuKind,
      });
    } else {
      setSelectedCategory({
        majorCategory: MAJOR_CATEGORIES[1],
        minorCategory: menus[0].hospitalMenuKind,
      });
    }
    setCalendarData(calendarData);
  };

  useEffect(() => {
    getOriginalCalendar();
  }, [year, month, queryClient]);

  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.autoPlan.edit}
      handleSubmit={handleSubmit(onSubmit, onError)}
    >
      <MealCreateHeader
        pageHeaderTitle={PAGE_TITLE.autoPlan.edit}
        selectedCategory={selectedCategory}
        register={register}
        errors={errors}
      />
      <MealCalendar
        type='edit'
        year={year}
        month={month}
        data={calendarData}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
        handleChangeMenu={handleChangeMenu}
        handleResetMenu={handleResetMenu}
      />
    </MealForm>
  );
};

export default AutoPlanEdit;
