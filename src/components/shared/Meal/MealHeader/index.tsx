'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/common/Input';
import { Option, Selectbox } from '@/components/common/Selectbox';

type MealHeaderFormData = {
  name: string;
};

type MealHeaderProps = {
  month: number;
  categories: Option[][];
  register: UseFormRegister<MealHeaderFormData>;
  errors: FieldErrors<MealHeaderFormData>;
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

export const organizationList = [
  { value: '학교', label: '학교' },
  { value: '학교명', label: '학교명' },
  { value: '병원', label: '병원' },
];

export const schoolLevelList = [
  { value: '초등학교', label: '초등학교' },
  { value: '중학교', label: '중학교' },
  { value: '고등학교', label: '고등학교' },
];

const MealHeader = ({
  categories,
  register,
  errors,
  selectedCategory,
  handleCategoryChange,
}: MealHeaderProps) => {
  const isCategoryEmpty =
    !selectedCategory.organization || !selectedCategory.organizationDetail;

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex w-fit flex-col gap-2'>
        <Input
          bgcolor='search'
          height='large'
          placeholder='식단 이름을 입력하세요'
          className='text-2xl font-semibold'
          {...register('name')}
        />
        {errors?.name?.message && (
          <span className='text-red-300'>{errors.name.message.toString()}</span>
        )}
        <div className='flex gap-2'>
          <Selectbox
            options={organizationList}
            size='basic'
            onChange={(organization) =>
              handleCategoryChange('organization', organization)
            }
            className={isCategoryEmpty ? 'border-red-300' : ''}
          />
          {organizationList.map(
            (item, index) =>
              selectedCategory.organization === item.value && (
                <Selectbox
                  key={item.value}
                  options={categories[index]}
                  size='basic'
                  onChange={(organizationDetail) =>
                    handleCategoryChange(
                      'organizationDetail',
                      organizationDetail,
                    )
                  }
                  className={isCategoryEmpty ? 'border-red-300' : ''}
                />
              ),
          )}
        </div>
        {isCategoryEmpty && (
          <span className='mt-auto text-red-300'>
            모든 카테고리를 선택해주세요
          </span>
        )}
      </div>
    </div>
  );
};

export default MealHeader;
