'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import InfoCard from '@/components/common/InfoCard';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader from '@/components/shared/Meal/MealHeader';
import { MOCK_CATEGORY_LIST } from '@/constants/_category';

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;

const AutoPlan = () => {
  const [selectedCategory, setSelectedCategory] = useState({
    organization: '',
    organizationDetail: '',
  });
  const isCategoryEmpty = !(
    selectedCategory.organization || selectedCategory.organizationDetail
  );

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

  const handleCategoryChange = (
    type: 'organization' | 'organizationDetail',
    value: string,
  ) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const onSubmit = (data: { name: string }) => {
    if (isCategoryEmpty) return;
    // 선택한 카테고리 + 식단이름 제출 + autoPlan/create로 이동
    console.log(data);
  };

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex w-fit flex-col gap-4'>
          <legend className='sr-only'>자동 식단 이름 및 카테고리 등록</legend>
          <MealHeader
            categories={MOCK_CATEGORY_LIST}
            register={register}
            errors={errors}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            isValid={isValid}
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
      <div className='absolute right-2 top-1/4 flex flex-col gap-2'>
        <InfoCard message='선택한 카테고리에 맞는 식단이 자동으로 생성됩니다.' />
        <InfoCard message='식단을 원하는 이름으로 생성하고, 관리할 수 있습니다.' />
      </div>
    </div>
  );
};

export default AutoPlan;
