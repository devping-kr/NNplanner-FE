'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import InfoCard from '@/components/common/InfoCard';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader from '@/components/shared/Meal/MealHeader';
import { MOCK_CATEGORY_LIST } from '@/constants/_category';
import { INFOCARD_MESSAGE } from '@/constants/_infoCard';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { useToastStore } from '@/stores/useToastStore';

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;

const AutoPlan = () => {
  const [selectedCategory, setSelectedCategory] = useState({
    organization: '',
    organizationDetail: '',
  });
  const [isCategoryError, setIsCategoryError] = useState(false);
  const { showToast } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const handleChangeCategory = (
    type: 'organization' | 'organizationDetail',
    value: string,
  ) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [type]: value,
    }));
    setIsCategoryError(false);
  };

  const onSubmit = (data: { name: string }) => {
    // if (isCategoryEmpty) return;
    // 선택한 카테고리 + 식단이름 제출 + autoPlan/create로 이동
    console.log(data);
    const isSelectedCategoryInvalid =
      selectedCategory.organization === '' ||
      selectedCategory.organizationDetail === '';

    if (isSelectedCategoryInvalid) {
      showToast(MEAL_HEADER_ERROR.category.min, 'warning', 3000);
      setIsCategoryError(true);
      return;
    }
  };

  // 폼 스키마 충족하지 못한 상태로 submit할 경우
  const onError = () => {
    if (errors.name) {
      showToast(MEAL_HEADER_ERROR.name.min, 'warning', 3000);
      return;
    }
  };

  return (
    <div className='flex gap-8'>
      <form className='w-fit' onSubmit={handleSubmit(onSubmit, onError)}>
        <fieldset className='flex w-fit flex-col gap-4'>
          <legend className='sr-only'>자동 식단 이름 및 카테고리 등록</legend>
          <MealHeader
            categories={MOCK_CATEGORY_LIST}
            register={register}
            errors={errors}
            selectedCategory={selectedCategory}
            handleChangeCategory={handleChangeCategory}
            isCategoryError={isCategoryError}
          />
          <MealCalendar
            selectedCategory={selectedCategory}
            isValid={isValid}
            year={year}
            month={month}
            readonly={true}
          />
        </fieldset>
      </form>
      <div className='flex w-fit max-w-[500px] flex-col gap-2 pt-[166px]'>
        <InfoCard message={INFOCARD_MESSAGE.name} />
        <InfoCard message={INFOCARD_MESSAGE.category} />
      </div>
    </div>
  );
};

export default AutoPlan;
