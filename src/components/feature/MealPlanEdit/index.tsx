'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { MajorCategory } from '@/type/menu/menuRequest';
import { FoodInfo, MenuResponseDTO } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import {
  isValidDateString,
  transformCalendarToPostSave,
} from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader, {
  MealHeaderFormData,
} from '@/components/shared/Meal/MealHeader';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { usePutMonthMenus } from '@/hooks/menu/usePutMonthMenus';
import { useFetchMinorCategories } from '@/hooks/menuCategory/useFetchMinorCategories';
import useNavigate from '@/hooks/useNavigate';
import { useMealPlanStore } from '@/stores/useMealPlanStore';
import { useToastStore } from '@/stores/useToastStore';

type MealPlanEditProps = {
  id: string;
};

// TODO: 식단 수정 API 연결
const MealPlanEdit = ({ id: monthMenuId }: MealPlanEditProps) => {
  const { monthMenuName, category, calendar, year, month } = useMealPlanStore(
    (state) => ({
      monthMenuName: state.monthMenuName,
      category: state.category,
      calendar: state.calendar,
      year: state.year,
      month: state.month,
    }),
  );
  const [calendarData, setCalendarData] = useState(calendar);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>(category);
  const [isCategoryError, setIsCategoryError] = useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const { navigate } = useNavigate();

  const queryClient = useQueryClient();
  const { minorCategories } = useFetchMinorCategories(category.majorCategory);
  const { mutate: putMutate } = usePutMonthMenus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      monthMenuName,
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
    setCalendarData(calendar);
    setSelectedDate('');
  };

  const onSubmit = (data: MealHeaderFormData) => {
    const { majorCategory, minorCategory } = selectedCategory;

    const isSelectedCategoryInvalid =
      majorCategory === '' || minorCategory === '';

    if (isSelectedCategoryInvalid) {
      showToast(MEAL_HEADER_ERROR.category.min, 'warning', 3000);
      setIsCategoryError(true);
      return;
    }

    const formattedData = transformCalendarToPostSave(
      calendar,
      data.monthMenuName,
      selectedCategory.majorCategory as MajorCategory,
      selectedCategory.minorCategory,
      calendarData,
    );
    putMutate(
      {
        request: formattedData,
        monthMenuId,
      },
      {
        onSuccess: ({ message }: Result<MenuResponseDTO>, variables) => {
          showToast(message, 'success', 1000);
          queryClient.invalidateQueries({
            queryKey: ['monthMenuDetail', variables.monthMenuId],
          });
          navigate(`${ROUTES.VIEW.PLAN}/${monthMenuId}`);
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error?.response?.data?.message || '식단 수정 실패';
          showToast(errorMessage, 'warning', 1000);
        },
      },
    );
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
        categories={minorCategories}
        register={register}
        errors={errors}
        selectedCategory={selectedCategory}
        handleChangeCategory={handleChangeCategory}
        isCategoryError={isCategoryError}
        pageHeaderTitle={PAGE_TITLE.mealPlan.edit}
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

export default MealPlanEdit;
