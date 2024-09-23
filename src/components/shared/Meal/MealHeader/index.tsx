'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/common/Input';
import { Option, Selectbox } from '@/components/common/Selectbox';
import { ORGANIZATION_LIST } from '@/constants/_category';

type MealHeaderFormData = {
  name: string;
};

type MealHeaderProps = {
  categories: Option[][];
  register: UseFormRegister<MealHeaderFormData>;
  errors: FieldErrors<MealHeaderFormData>;
  categoryErrorMsg?: string;
  selectedCategory: {
    organization: string | null;
    organizationDetail: string | null;
  };
  handleCategoryChange: (
    type: 'organization' | 'organizationDetail',
    value: string,
  ) => void;
  isValid: boolean;
};

const MealHeader = ({
  categories,
  register,
  errors,
  categoryErrorMsg = '모든 카테고리를 선택해주세요',
  selectedCategory,
  handleCategoryChange,
}: MealHeaderProps) => {
  const isCategoryEmpty =
    !selectedCategory.organization || !selectedCategory.organizationDetail;

  return (
    <div className='flex w-full items-center gap-4'>
      <div className='relative flex h-fit flex-col'>
        <Input
          bgcolor='meal'
          height='large'
          placeholder='식단 이름을 입력하세요'
          className='text-2xl font-semibold'
          {...register('name')}
        />
        {errors?.name?.message && (
          <span className='absolute bottom-[-26px] text-nowrap text-red-300'>
            {errors.name.message.toString()}
          </span>
        )}
      </div>
      <div className='relative flex gap-2'>
        <Selectbox
          options={ORGANIZATION_LIST}
          size='basic'
          onChange={(organization) =>
            handleCategoryChange('organization', organization)
          }
          className={isCategoryEmpty ? 'border-red-300' : ''}
        />
        {ORGANIZATION_LIST.map(
          (item, index) =>
            selectedCategory.organization === item.value && (
              <Selectbox
                key={item.value}
                options={categories[index]}
                size='basic'
                onChange={(organizationDetail) =>
                  handleCategoryChange('organizationDetail', organizationDetail)
                }
                className={isCategoryEmpty ? 'border-red-300' : ''}
              />
            ),
        )}
        {isCategoryEmpty && (
          <span className='absolute bottom-[-32px] mt-auto text-nowrap text-red-300'>
            {categoryErrorMsg}
          </span>
        )}
      </div>
    </div>
  );
};

export default MealHeader;
