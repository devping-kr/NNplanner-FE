'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo } from '@/type/mealType';
import { MajorCategory } from '@/type/menu/menuRequest';
import { FoodInfo } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import {
  getCurrentYearMonthNow,
  isValidDateString,
  transformCalendarToPostSave,
} from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import { Option } from '@/components/common/Selectbox';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader from '@/components/shared/Meal/MealHeader';
import { MAJOR_CATEGORIES } from '@/constants/_meal';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { usePostMonthMenusSave } from '@/hooks/menu/usePostMonthMenusSave';
import useNavigate from '@/hooks/useNavigate';
import { useMenualPlanStore } from '@/stores/useMenualPlanStore';
import { useToastStore } from '@/stores/useToastStore';

const MenualPlanEdit = () => {
  const { monthMenuName, category, calendar } = useMenualPlanStore((state) => ({
    monthMenuName: state.monthMenuName,
    category: state.category,
    calendar: state.calendar,
  }));
  const [calendarData, setCalendarData] = useState<CalendarInfo>(calendar);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>(category);
  const { year, month } = getCurrentYearMonthNow();
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [minorCategories, setMinorCategories] = useState<Option[]>([]);
  const showToast = useToastStore((state) => state.showToast);
  const { navigate } = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: postSaveMutate } = usePostMonthMenusSave();

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
    setIsCategoryError(false);
  };

  const handleDateClick = (date: string) => {
    if (isValidDateString(date)) setSelectedDate(date);
  };

  const handleResetMenu = () => {
    // 메뉴 초기화 클릭 시 실행
    setCalendarData(calendar);
    setSelectedDate('');
  };

  const onSubmit = (data: { monthMenuName: string }) => {
    const { majorCategory, minorCategory } = selectedCategory;

    const isSelectedCategoryInvalid =
      majorCategory === '' || minorCategory === '';

    if (isSelectedCategoryInvalid) {
      showToast(MEAL_HEADER_ERROR.category.min, 'warning', 3000);
      setIsCategoryError(true);
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
    const fetchCategories = () => {
      switch (selectedCategory.majorCategory) {
        case MAJOR_CATEGORIES[0]:
          return queryClient.getQueryData<Result<string[]>>([
            'getSchoolMinorCategories',
          ]);
        case MAJOR_CATEGORIES[1]:
          return queryClient.getQueryData<Result<string[]>>([
            'getSchoolNameMinorCategories',
          ]);
        case MAJOR_CATEGORIES[2]:
          return queryClient.getQueryData<Result<string[]>>([
            'getHospitalMinorCategories',
          ]);
        default:
          return null;
      }
    };

    const categories = fetchCategories();
    if (!categories) return;
    const { data } = categories;
    if (!data) return;
    const formattedData = data.map((category) => ({
      value: category,
      label: category,
    }));
    setMinorCategories(formattedData);
  }, [selectedCategory.majorCategory]);

  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.menual.edit}
      handleSubmit={handleSubmit(onSubmit, onError)}
    >
      <MealHeader
        categories={minorCategories}
        register={register}
        errors={errors}
        selectedCategory={selectedCategory}
        handleChangeCategory={handleChangeCategory}
        isCategoryError={isCategoryError}
        pageHeaderTitle={PAGE_TITLE.autoPlan.edit}
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

export default MenualPlanEdit;
