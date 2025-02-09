'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { cn } from '@/utils/core';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { Option, Selectbox } from '@/components/common/Selectbox';
import { Caption1Grey500, H2BlackH2 } from '@/components/common/Typography';
import { ORGANIZATION_LIST } from '@/constants/_category';
import { AUTO_PLAN_BETA_MESSAGE } from '@/constants/_meal';
import { PAGE_TITLE } from '@/constants/_pageTitle';

export type MealHeaderFormData = {
  monthMenuName: string;
};

type MealHeaderProps = {
  pageHeaderTitle: string;
  categories: Option[];
  selectedCategory: SelectedCategory;
  handleChangeCategory: (
    type: HandleChangeCategoryParam,
    value: string,
  ) => void;
  register?: UseFormRegister<MealHeaderFormData>;
  errors?: FieldErrors<MealHeaderFormData>;
  isCategoryError?: boolean;
};

const MealHeader = ({
  pageHeaderTitle,
  categories,
  selectedCategory,
  handleChangeCategory,
  register,
  errors,
  isCategoryError,
}: MealHeaderProps) => {
  const isBothSelected =
    selectedCategory.majorCategory && selectedCategory.minorCategory;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <H2BlackH2>{pageHeaderTitle}</H2BlackH2>
        {pageHeaderTitle === PAGE_TITLE.autoPlan.default && (
          <Caption1Grey500>{AUTO_PLAN_BETA_MESSAGE} </Caption1Grey500>
        )}
      </div>
      <div className='flex w-full items-center gap-4'>
        {register && errors && (
          <div className='relative flex h-fit flex-col'>
            <Input
              bgcolor='meal'
              size='s'
              placeholder='식단명을 입력하세요'
              className={cn('text-lg')}
              isError={!!errors.monthMenuName?.message}
              autoComplete='off'
              {...register('monthMenuName')}
            />
          </div>
        )}

        <div className='relative flex gap-4'>
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
                  buttonSize='sm'
                  onChange={(minorCategory) =>
                    handleChangeCategory('minorCategory', minorCategory)
                  }
                  selectedValue={selectedCategory.minorCategory}
                  isError={isCategoryError}
                />
              ),
          )}
        </div>
        <Button
          variant='primary'
          size='sm'
          type='submit'
          disabled={!isBothSelected}
        >
          생성
        </Button>
      </div>
    </div>
  );
};

export default MealHeader;
