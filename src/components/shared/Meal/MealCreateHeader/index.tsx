import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SelectedCategory } from '@/type/menuCategory/category';
import { Input } from '@/components/common/Input';
import { Selectbox } from '@/components/common/Selectbox';
import { PageHeaderTitle } from '@/components/common/Typography';
import { MealHeaderFormData } from '@/components/shared/Meal/MealHeader';
import { PAGE_TITLE } from '@/constants/_pageTitle';

type MealCreateHeaderProps = {
  inputValue?: string;
  selectedCategory: SelectedCategory;
  pageHeaderTitle: string;
  register?: UseFormRegister<MealHeaderFormData>;
  errors?: FieldErrors<MealHeaderFormData>;
};

const MealCreateHeader = ({
  inputValue,
  selectedCategory,
  pageHeaderTitle,
  register,
  errors,
}: MealCreateHeaderProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <PageHeaderTitle>{pageHeaderTitle}</PageHeaderTitle>
      <div className='flex w-fit items-center gap-4'>
        <Input
          className='text-lg font-semibold focus:border-green-400'
          bgcolor='meal'
          height='basic'
          defaultValue={inputValue || ''}
          disabled={pageHeaderTitle === PAGE_TITLE.menualPlan.create}
          isError={!!errors?.monthMenuName?.message}
          autoComplete='off'
          {...(register ? register('monthMenuName') : {})}
        />
        <div className='flex gap-2'>
          <Selectbox
            size='small'
            selectedValue={selectedCategory.majorCategory}
            className='cursor-not-allowed focus:border-gray-300'
            readonly={true}
          />
          <Selectbox
            size='small'
            selectedValue={selectedCategory.minorCategory}
            className='cursor-not-allowed focus:border-gray-300'
            readonly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MealCreateHeader;
