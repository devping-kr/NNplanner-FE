'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { cn } from '@/utils/core';
import { Input } from '@/components/common/Input';
import { Option, Selectbox } from '@/components/common/Selectbox';
import { PageHeaderTitle } from '@/components/common/Typography';
import { ORGANIZATION_LIST } from '@/constants/_category';

type MealHeaderFormData = {
  name: string;
};

type MealHeaderProps = {
  categories: Option[][];
  register: UseFormRegister<MealHeaderFormData>;
  errors: FieldErrors<MealHeaderFormData>;
  selectedCategory: {
    organization: string;
    organizationDetail: string;
  };
  handleChangeCategory: (
    type: 'organization' | 'organizationDetail',
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
        <div className='relative flex h-fit flex-col'>
          <Input
            bgcolor='meal'
            height='basic'
            placeholder='식단 이름을 입력하세요'
            className={cn('text-lg')}
            isError={!!errors.name?.message}
            autoComplete='off'
            {...register('name')}
          />
        </div>
        <div className='relative flex gap-2'>
          <Selectbox
            options={ORGANIZATION_LIST}
            size='small'
            onChange={(organization) => {
              handleChangeCategory('organization', organization);
            }}
            selectedValue={selectedCategory.organization}
            isError={isCategoryError}
          />
          {ORGANIZATION_LIST.map(
            (item, index) =>
              selectedCategory.organization === item.value && (
                <Selectbox
                  key={item.value}
                  options={categories[index]}
                  size='small'
                  onChange={(organizationDetail) =>
                    handleChangeCategory(
                      'organizationDetail',
                      organizationDetail,
                    )
                  }
                  selectedValue={selectedCategory.organizationDetail}
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
