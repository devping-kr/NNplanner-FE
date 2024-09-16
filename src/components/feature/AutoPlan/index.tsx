'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealHeader, {
  schoolLevelList,
} from '@/components/shared/Meal/MealHeader';

const categories = [
  schoolLevelList,
  [
    { value: '학교', label: '학교' },
    { value: '학교명', label: '학교명' },
    { value: '병원', label: '병원' },
  ],
  [
    { value: '세번쨰', label: '세번쨰' },
    { value: '학교명', label: '학교명' },
    { value: '병원', label: '병원' },
    { value: '세번쨰', label: '세번쨰' },
    { value: '학교명', label: '학교명' },
    { value: '병원', label: '병원' },
    { value: '세번쨰', label: '세번쨰' },
    { value: '학교명', label: '학교명' },
    { value: '병원', label: '병원' },
  ],
];

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;

const AutoPlan = () => {
  const [selectedCategory, setSelectedCategory] = useState({
    organization: null as string | null,
    organizationDetail: null as string | null,
  });
  const isCategoryEmpty = !(
    selectedCategory.organization || selectedCategory.organizationDetail
  );

  const dataClick = (date: string) => {
    console.log(date);
  };

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
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-fit flex-col gap-8'
    >
      <MealHeader
        categories={categories}
        month={month}
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
        onDateClick={dataClick}
      />
    </form>
  );
};

export default AutoPlan;
