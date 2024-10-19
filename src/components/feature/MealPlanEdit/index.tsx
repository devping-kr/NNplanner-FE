'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo } from '@/type/mealType';
import { MajorCategory } from '@/type/menu/menuRequest';
import { FoodInfo, MenuResponseDTO } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import {
  getYearAndMonth,
  isValidDateString,
  transformCalendarToPostSave,
  transformResponseToCalendar,
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
import { useToastStore } from '@/stores/useToastStore';

type MealPlanEditProps = {
  id: string;
};

const MealPlanEdit = ({ id: monthMenuId }: MealPlanEditProps) => {
  const [cachedCalendarData, setCachedCalendarData] = useState<CalendarInfo>(
    {},
  );
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [calendarData, setCalendarData] = useState<CalendarInfo>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    majorCategory: '',
    minorCategory: '',
  });
  const [isCategoryError, setIsCategoryError] = useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const { navigate } = useNavigate();

  const queryClient = useQueryClient();
  const { minorCategories } = useFetchMinorCategories(
    selectedCategory.majorCategory,
  );
  const { mutate: putMutate } = usePutMonthMenus();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      monthMenuName: '',
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
    getOriginalCalendar();
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
      cachedCalendarData,
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

  // 쿼리키로 캐싱해둔 식단 상세 정보 가져옴
  const getOriginalCalendar = () => {
    const cachedMealPlanData = queryClient.getQueryData<
      Result<MenuResponseDTO>
    >(['monthMenuDetail', monthMenuId]);

    if (!cachedMealPlanData) return;
    const {
      createAt,
      majorCategory,
      minorCategory,
      monthMenuName,
      monthMenuList,
    } = cachedMealPlanData.data;
    reset({
      monthMenuName: monthMenuName,
    });
    const { year, month } = getYearAndMonth(createAt);
    setYear(year);
    setMonth(month);
    const cachedCalendarData = transformResponseToCalendar(
      year,
      month,
      monthMenuList,
      'detail',
    );
    setCalendarData(cachedCalendarData);
    setCachedCalendarData(cachedCalendarData);
    setSelectedCategory({
      majorCategory: majorCategory,
      minorCategory: minorCategory,
    });
  };

  useEffect(() => {
    getOriginalCalendar();
  }, []);

  if (!Object.keys(calendarData).length) {
    return <div>로딩 중...</div>;
  }

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
