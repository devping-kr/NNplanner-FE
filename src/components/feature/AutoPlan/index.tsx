'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import { getCurrentYearMonthNow, getLastDateOfMonth } from '@/utils/calendar';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader from '@/components/shared/Meal/MealHeader';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { usePostMonthMenusAuto } from '@/hooks/menu/usePostMonthMenusAuto';
import { useFetchMinorCategories } from '@/hooks/menuCategory/useFetchMinorCategories';
import { usePrefetchMinorCategories } from '@/hooks/menuCategory/usePrefetchMinorCategories';
import useNavigate from '@/hooks/useNavigate';
import { useAutoPlanStore } from '@/stores/useAutoPlanStore';
import { useToastStore } from '@/stores/useToastStore';

const AutoPlan = () => {
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    majorCategory: '',
    minorCategory: '',
  });
  const [isCategoryError, setIsCategoryError] = useState(false);
  const { year, month } = getCurrentYearMonthNow();
  const showToast = useToastStore((state) => state.showToast);
  const { navigate } = useNavigate();
  const setCategory = useAutoPlanStore((state) => state.setCategory);

  const queryClient = useQueryClient();
  const { minorCategories } = useFetchMinorCategories(
    selectedCategory.majorCategory,
  );
  const { mutate: postAutoMutate } = usePostMonthMenusAuto();
  const { prefetchMinorCategories, hasCategories } =
    usePrefetchMinorCategories();

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

  const handleSubmit = () => {
    const { majorCategory, minorCategory } = selectedCategory;

    const isSelectedCategoryInvalid =
      majorCategory === '' || minorCategory === '';

    if (isSelectedCategoryInvalid) {
      showToast(MEAL_HEADER_ERROR.category.min, 'warning', 3000);
      setIsCategoryError(true);
      return;
    }

    postAutoMutate(
      {
        majorCategory: majorCategory,
        minorCategory: minorCategory,
        dayCount: getLastDateOfMonth(year, month),
      },
      {
        onSuccess: ({ message, data }: Result<null>) => {
          showToast(message, 'success', 1000);
          queryClient.setQueryData(['monthMenusAuto'], data);
          setCategory({
            majorCategory,
            minorCategory,
          });
          navigate(ROUTES.CREATE.AUTO);
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error?.response?.data?.message || '자동 식단 생성 실패';
          showToast(errorMessage, 'warning', 1000);
        },
      },
    );
  };
  useEffect(() => {
    if (hasCategories) return;
    prefetchMinorCategories();
  }, [hasCategories, prefetchMinorCategories]);

  return (
    <div className='flex gap-6'>
      <MealForm
        legend={MEAL_FORM_LEGEND.autoPlan.create}
        handleSubmit={handleSubmit}
      >
        <MealHeader
          type='default'
          categories={minorCategories}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
          isCategoryError={isCategoryError}
          pageHeaderTitle={PAGE_TITLE.autoPlan.default}
        />
        <MealCalendar
          selectedCategory={selectedCategory}
          year={year}
          month={month}
          readonly={true}
        />
      </MealForm>
    </div>
  );
};

export default AutoPlan;
