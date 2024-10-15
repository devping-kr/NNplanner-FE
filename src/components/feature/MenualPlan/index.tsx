'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo } from '@/type/mealType';
import { FoodInfo } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { Result } from '@/type/response';
import {
  getCurrentYearMonthNow,
  hasNonEmptyFoods,
  isValidDateString,
} from '@/utils/calendar';
import InfoCard from '@/components/common/InfoCard';
import MealForm from '@/components/common/MealForm';
import { Option } from '@/components/common/Selectbox';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader, {
  MealHeaderFormData,
} from '@/components/shared/Meal/MealHeader';
import { INFOCARD_MESSAGE } from '@/constants/_infoCard';
import { MAJOR_CATEGORIES } from '@/constants/_meal';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { MEAL_CREATE_MESSAGE } from '@/constants/_toastMessage';
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
  const [minorCategories, setMinorCategories] = useState<Option[]>([]);
  const showToast = useToastStore((state) => state.showToast);
  const { setMonthMenuName, setCategory, setCalendar } = useMenualPlanStore(
    (state) => ({
      setMonthMenuName: state.setMonthMenuName,
      setCategory: state.setCategory,
      setCalendar: state.setCalendar,
    }),
  );
  const { navigate } = useNavigate();

  const queryClient = useQueryClient();
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

    if (!hasNonEmptyFoods(calendarData)) {
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
    if (!hasCategories) {
      prefetchMinorCategories();
    }
  }, [hasCategories, prefetchMinorCategories]);

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
