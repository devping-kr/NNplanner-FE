'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { cn } from '@/utils/core';
import { Input } from '@/components/common/Input';
import { Option, Selectbox } from '@/components/common/Selectbox';
import { PageHeaderTitle } from '@/components/common/Typography';
import { ORGANIZATION_LIST } from '@/constants/_category';

export type MealHeaderFormData = {
  monthMenuName: string;
};

type MealHeaderProps = {
  categories: Option[];
  register?: UseFormRegister<MealHeaderFormData>;
  errors?: FieldErrors<MealHeaderFormData>;
  selectedCategory: SelectedCategory;
  handleChangeCategory: (
    type: HandleChangeCategoryParam,
    value: string,
  ) => void;
  isCategoryError?: boolean;
  pageHeaderTitle: string;
};

const MealHeader = ({
  categories,
  register,
  errors,
  selectedCategory,
  handleChangeCategory,
  isCategoryError,
  pageHeaderTitle,
}: MealHeaderProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <PageHeaderTitle>{pageHeaderTitle}</PageHeaderTitle>
      <div className='flex w-full items-center gap-4'>
        {register && errors && (
          <div className='relative flex h-fit flex-col'>
            <Input
              bgcolor='meal'
              height='basic'
              placeholder='식단 이름을 입력하세요'
              className={cn('text-lg')}
              isError={!!errors.monthMenuName?.message}
              autoComplete='off'
              {...register('monthMenuName')}
            />
          </div>
        )}
        <div className='relative flex gap-2'>
          <Selectbox
            options={ORGANIZATION_LIST}
            size='small'
            onChange={(majorCategory) => {
              handleChangeCategory('majorCategory', majorCategory);
            }}
            selectedValue={selectedCategory.majorCategory}
            isError={isCategoryError}
          />
          {ORGANIZATION_LIST.map(
            (item) =>
              selectedCategory.majorCategory === item.value && (
                <Selectbox
                  key={item.value}
                  options={categories}
                  size='small'
                  onChange={(minorCategory) =>
                    handleChangeCategory('minorCategory', minorCategory)
                  }
                  selectedValue={selectedCategory.minorCategory}
                  isError={isCategoryError}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MealHeader;
