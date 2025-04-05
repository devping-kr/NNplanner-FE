'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo, MealHeaderForm } from '@/type/mealType';
import { MajorCategory } from '@/type/menu/menuRequest';
import { MenuResponse } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import {
  getCurrentYearMonthNow,
  getLastDateOfMonth,
  isAllFoodsEmpty,
  transformCalendarToPostSave,
  transformResponseToCalendar,
} from '@/utils/calendar';
import { stringArraytoOptionArray } from '@/utils/meal';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown';
import { Input } from '@/components/common/Input';
import MealForm from '@/components/common/MealForm';
import OptionList from '@/components/common/OptionList';
import { Option, Selectbox } from '@/components/common/Selectbox';
import {
  Caption1Grey500,
  H2BlackH2,
  Subtitle2White,
} from '@/components/common/Typography';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import { MealHeaderFormData } from '@/components/shared/Meal/MealHeader';
import { ORGANIZATION_LIST } from '@/constants/_category';
import { AUTO_PLAN_BETA_MESSAGE } from '@/constants/_meal';
import {
  MEAL_FORM_LEGEND,
  MINIMUM_SCHOOL_NAME_LENGTH,
} from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { usePostMonthMenusAuto } from '@/hooks/menu/usePostMonthMenusAuto';
import { usePostMonthMenusSave } from '@/hooks/menu/usePostMonthMenusSave';
import { useFetchMinorCategories } from '@/hooks/menuCategory/useFetchMinorCategories';
import { useGetSearchSchool } from '@/hooks/menuCategory/useGetSearchSchool';
import { usePrefetchMinorCategories } from '@/hooks/menuCategory/usePrefetchMinorCategories';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';

/**
 * @description 자동 식단 생성 페이지
 */
const AutoPlan = () => {
  const [calendarData, setCalendarData] = useState<CalendarInfo>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    majorCategory: '',
    minorCategory: '',
  });
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [keyword, setKeyword] = useState('');
  const { year, month } = getCurrentYearMonthNow();
  const showToast = useToastStore((state) => state.showToast);
  const { navigate } = useNavigate();

  const queryClient = useQueryClient();
  const { minorCategories } = useFetchMinorCategories(
    selectedCategory.majorCategory,
  );
  const { mutate: postAutoMutate } = usePostMonthMenusAuto();
  const { mutate: postSaveMutate } = usePostMonthMenusSave();
  const { prefetchMinorCategories, hasCategories } =
    usePrefetchMinorCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<MealHeaderForm>({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
  });

  const handleChangeCategory = (
    type: HandleChangeCategoryParam,
    value: string,
  ) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [type]: value,
      ...(type === 'majorCategory' && { minorCategory: '' }),
    }));
    setIsCategoryError(false);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const isBothSelected =
    selectedCategory.majorCategory && selectedCategory.minorCategory;

  // 식단 생성
  const handleCreatePlan = () => {
    const { majorCategory, minorCategory } = selectedCategory;

    if (!isBothSelected) {
      showToast(MEAL_HEADER_ERROR.category.min, 'warning', 3000);
      setIsCategoryError(true);
      return;
    }

    postAutoMutate(
      {
        majorCategory,
        minorCategory,
        dayCount: getLastDateOfMonth(year, month),
      },
      {
        onSuccess: ({ message, data }: Result<null>) => {
          showToast(message, 'success', 1000);
          queryClient.setQueryData(['monthMenusAuto'], data);
          const menus = queryClient.getQueryData<MenuResponse[]>([
            'monthMenusAuto',
          ]);
          if (menus) {
            const calendarData = transformResponseToCalendar(
              year,
              month,
              menus,
            );
            setCalendarData(calendarData);
          }
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error?.response?.data?.message || '자동 식단 생성 실패';
          showToast(errorMessage, 'warning', 1000);
        },
      },
    );
  };

  // 저장 버튼 클릭 시
  const onSubmit = (data: MealHeaderFormData) => {
    const formattedData = transformCalendarToPostSave(
      calendarData,
      data.monthMenuName,
      selectedCategory.majorCategory as MajorCategory,
      selectedCategory.minorCategory,
    );

    postSaveMutate(formattedData, {
      onSuccess: ({ message }: Result<null>) => {
        showToast(message, 'success', 1000);
        navigate(ROUTES.VIEW.PLAN);
      },
      onError: (error: AxiosError<FailResponse>) => {
        const errorMessage =
          error?.response?.data?.message || '자동 식단 저장 실패';
        showToast(errorMessage, 'warning', 1000);
      },
    });
  };

  // form 유효성 검사 실패 시
  const onError = () => {
    if (errors.monthMenuName) {
      showToast(MEAL_HEADER_ERROR.name.min, 'warning', 3000);
      return;
    }
  };

  useEffect(() => {
    if (hasCategories) return;
    prefetchMinorCategories();
  }, [hasCategories, prefetchMinorCategories]);

  const handleSchoolNameSelect = (schoolName: string) => {
    setValue('schoolName', schoolName);
    setSelectedCategory((prev) => ({
      ...prev,
      minorCategory: schoolName,
    }));
    setIsOpen(false);
  };

  const {
    data: schoolNameData,
    isSuccess: isSchoolNameSuccess,
    isError: isSchoolNameError,
  } = useGetSearchSchool(
    {
      keyword: keyword,
    },
    {
      enabled: keyword.length >= MINIMUM_SCHOOL_NAME_LENGTH,
    },
  );

  // 학교명 입력 후 검색 클릭 시
  const handleSearchClick = () => {
    if (getValues('schoolName').length < MINIMUM_SCHOOL_NAME_LENGTH)
      return null;

    setKeyword(getValues('schoolName'));

    if (isSchoolNameError) {
      showToast(
        '학교명 검색에 실패했습니다. 잠시 후 다시 시도해주세요.',
        'warning',
      );
      setIsOpen(false);
      return null;
    }
  };

  useEffect(() => {
    if (isSchoolNameSuccess) {
      if (schoolNameData.data.length === 0) {
        showToast('찾으시는 학교명이 없습니다.', 'warning');
        setIsOpen(false);
        return;
      }
      const formattedOptions = stringArraytoOptionArray(schoolNameData.data);
      setOptions(formattedOptions);
      setIsOpen(true);
    }
  }, [isSchoolNameSuccess, schoolNameData]);

  const watchSchoolName = watch('schoolName');

  return (
    <div className='flex gap-6'>
      <MealForm
        legend={MEAL_FORM_LEGEND.autoPlan.create}
        handleSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-4'>
            <H2BlackH2>{PAGE_TITLE.autoPlan.default}</H2BlackH2>
            <Caption1Grey500>{AUTO_PLAN_BETA_MESSAGE} </Caption1Grey500>
          </div>
          <div className='flex w-full items-center gap-4'>
            <div className='flex gap-4'>
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
                <div className='relative'>
                  {selectedCategory.majorCategory === '학교명' && (
                    <div className='flex gap-2'>
                      <Input
                        variant='white'
                        size='s'
                        className='h-12'
                        placeholder='두 글자 이상 입력'
                        autoComplete='off'
                        {...register('schoolName')}
                      />
                      <Button
                        variant='teritary'
                        className='min-w-[68px]'
                        disabled={watchSchoolName?.length < 2}
                        onClick={handleSearchClick}
                      >
                        <Subtitle2White>검색</Subtitle2White>
                      </Button>
                    </div>
                  )}
                  <Dropdown isOpen={isOpen} className='top-12'>
                    <OptionList
                      options={options}
                      onSelect={handleSchoolNameSelect}
                      size='basic'
                    />
                  </Dropdown>
                </div>

                {ORGANIZATION_LIST.map(
                  (organization) =>
                    selectedCategory.majorCategory === organization.value &&
                    selectedCategory.majorCategory !== '학교명' && (
                      <Selectbox
                        key={organization.value}
                        options={minorCategories}
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
              <Button
                variant='primary'
                size='sm'
                disabled={!isBothSelected}
                onClick={handleCreatePlan}
              >
                <Subtitle2White>식단 불러오기</Subtitle2White>
              </Button>
            </div>
            <div className='flex w-fit items-center gap-2'>
              <Button
                variant='primary'
                size='sm'
                disabled={isAllFoodsEmpty(calendarData)}
                type='submit'
              >
                <Subtitle2White>저장</Subtitle2White>
              </Button>
            </div>
          </div>
        </div>
        <MealCalendar
          type={'create'}
          data={calendarData}
          year={year}
          month={month}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
          selectedCategory={selectedCategory}
        />
      </MealForm>
    </div>
  );
};

export default AutoPlan;
