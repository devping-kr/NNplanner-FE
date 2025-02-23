'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CalendarType } from '@/type/calendar';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { Option, Selectbox } from '@/components/common/Selectbox';
import {
  Caption1Grey500,
  H2BlackH2,
  Subtitle2Green500,
  Subtitle2Grey100,
  Subtitle2Grey900,
  Subtitle2White,
} from '@/components/common/Typography';
import { ORGANIZATION_LIST } from '@/constants/_category';
import { AUTO_PLAN_BETA_MESSAGE } from '@/constants/_meal';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import useNavigate from '@/hooks/useNavigate';

export type MealHeaderFormData = {
  monthMenuName: string;
};

type MealHeaderProps = {
  type?: CalendarType;
  pageHeaderTitle: string;
  categories: Option[];
  selectedCategory: SelectedCategory;
  handleChangeCategory: (
    type: HandleChangeCategoryParam,
    value: string,
  ) => void;
  handleResetMenu?: () => void;
  handleEditMenu?: () => void;
  handleCreateSurvey?: () => void;
  handleSaveExcel?: () => void;
  handleDeleteMenu?: () => void;
  register?: UseFormRegister<MealHeaderFormData>;
  errors?: FieldErrors<MealHeaderFormData>;
  isCategoryError?: boolean;
};

const MealHeader = ({
  type = 'default',
  pageHeaderTitle,
  categories,
  selectedCategory,
  handleChangeCategory,
  handleResetMenu,
  handleEditMenu,
  register,
  errors,
  isCategoryError,
}: MealHeaderProps) => {
  const { handleBack } = useNavigate();
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
              variant='white'
              size='s'
              className='h-12'
              placeholder='식단 이름을 입력하세요'
              isError={!!errors.monthMenuName?.message}
              autoComplete='off'
              {...register('monthMenuName')}
            />
          </div>
        )}

        <div className='relative flex gap-4'>
          <Selectbox
            options={ORGANIZATION_LIST}
            buttonSize='sm'
            className='min-w-[194px] justify-start'
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
                  className='min-w-[194px] justify-start'
                  onChange={(minorCategory) =>
                    handleChangeCategory('minorCategory', minorCategory)
                  }
                  selectedValue={selectedCategory.minorCategory}
                  isError={isCategoryError}
                />
              ),
          )}
        </div>

        {type === 'default' && (
          <Button
            variant='primary'
            size='sm'
            type='submit'
            disabled={!isBothSelected}
          >
            <Subtitle2White>생성</Subtitle2White>
          </Button>
        )}
        {type === 'create' && (
          <div className='flex w-fit items-center gap-2'>
            <Button variant='primary' size='sm' type='submit' disabled={true}>
              <Subtitle2White>저장</Subtitle2White>
            </Button>
            <Button
              variant='teritary'
              size='sm'
              type='button'
              onClick={handleEditMenu}
            >
              <Subtitle2Grey100>메뉴 수정</Subtitle2Grey100>
            </Button>
          </div>
        )}
        {type === 'edit' && (
          <div className='flex gap-4'>
            <div className='flex w-fit items-center gap-2'>
              <Button variant='primary' size='sm' type='submit'>
                <Subtitle2White>수정 완료</Subtitle2White>
              </Button>
              <Button variant='secondary' size='sm' onClick={handleBack}>
                <Subtitle2Green500>취소</Subtitle2Green500>
              </Button>
            </div>
            <Button variant='grey' size='sm' onClick={handleResetMenu}>
              <Subtitle2Grey900>메뉴 초기화</Subtitle2Grey900>
            </Button>
          </div>
        )}
        {type === 'menualCreate' && (
          <div className='flex w-fit items-center gap-2'>
            <Button
              size='sm'
              variant='outline'
              type='button'
              onClick={handleResetMenu}
            >
              <Subtitle2Grey900>메뉴 초기화</Subtitle2Grey900>
            </Button>
            <Button size='sm' type='submit'>
              <Subtitle2White>생성</Subtitle2White>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealHeader;
