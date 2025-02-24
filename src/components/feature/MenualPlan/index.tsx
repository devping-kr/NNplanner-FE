'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo } from '@/type/mealType';
import { FoodInfo } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import {
  getCurrentYearMonthNow,
  hasFoods,
  isValidDateString,
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
import { MEAL_CREATE_MESSAGE } from '@/constants/_toastMessage';
import { useFetchMinorCategories } from '@/hooks/menuCategory/useFetchMinorCategories';
import { usePrefetchMinorCategories } from '@/hooks/menuCategory/usePrefetchMinorCategories';
import useNavigate from '@/hooks/useNavigate';
import { useMenualPlanStore } from '@/stores/useMenualPlanStore';
import { useToastStore } from '@/stores/useToastStore';

const MenualPlan = () => {
  const [calendarData, setCalendarData] = useState<CalendarInfo>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    majorCategory: '',
    minorCategory: '',
  });
  const { year, month } = getCurrentYearMonthNow();
  const [isCategoryError, setIsCategoryError] = useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const { setMonthMenuName, setCategory, setCalendar } = useMenualPlanStore(
    (state) => ({
      setMonthMenuName: state.setMonthMenuName,
      setCategory: state.setCategory,
      setCalendar: state.setCalendar,
    }),
  );
  const { navigate } = useNavigate();

  const { minorCategories } = useFetchMinorCategories(
    selectedCategory.majorCategory,
  );
  const { prefetchMinorCategories, hasCategories } =
    usePrefetchMinorCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealHeaderFormData>({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
  });

  const handleSaveMenu = (date: string, menuList: FoodInfo[]) => {
    setCalendarData((prevList) => ({
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
    setCalendarData({});
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

    if (!hasFoods(calendarData)) {
      showToast(MEAL_CREATE_MESSAGE.error.emptyFood, 'warning', 3000);
    } else {
      setMonthMenuName(data.monthMenuName);
      setCalendar(calendarData);
      setCategory(selectedCategory);
      navigate(ROUTES.CREATE.MENUAL);
    }
  };

  const onError = () => {
    if (errors.monthMenuName) {
      showToast(MEAL_HEADER_ERROR.name.min, 'warning', 3000);
      return;
    }
  };

  useEffect(() => {
    if (hasCategories) return;
    prefetchMinorCategories();
  }, [hasCategories, prefetchMinorCategories]);

  return (
    <div className='flex gap-8'>
      <MealForm
        legend={MEAL_FORM_LEGEND.menual.create}
        handleSubmit={handleSubmit(onSubmit, onError)}
      >
        <MealHeader
          categories={minorCategories}
          register={register}
          errors={errors}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
          isCategoryError={isCategoryError}
          pageHeaderTitle={PAGE_TITLE.menualPlan.default}
          handleResetMenu={handleResetMenu}
        />
        <MealCalendar
          type='menualCreate'
          selectedCategory={selectedCategory}
          year={year}
          month={month}
          data={calendarData}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
          handleSaveMenu={handleSaveMenu}
        />
      </MealForm>
    </div>
  );
};

export default MenualPlan;
