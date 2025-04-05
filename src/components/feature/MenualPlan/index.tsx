'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo, MealHeaderForm } from '@/type/mealType';
import { FoodInfo } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import {
  getCurrentYearMonthNow,
  hasFoods,
  isValidDateString,
} from '@/utils/calendar';
import { stringArraytoOptionArray } from '@/utils/meal';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown';
import { Input } from '@/components/common/Input';
import MealForm from '@/components/common/MealForm';
import OptionList from '@/components/common/OptionList';
import { Option, Selectbox } from '@/components/common/Selectbox';
import { H2BlackH2, Subtitle2White } from '@/components/common/Typography';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import { MealHeaderFormData } from '@/components/shared/Meal/MealHeader';
import { ORGANIZATION_LIST } from '@/constants/_category';
import { MAJOR_CATEGORIES } from '@/constants/_meal';
import {
  MEAL_FORM_LEGEND,
  MINIMUM_SCHOOL_NAME_LENGTH,
} from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { PAGE_TITLE } from '@/constants/_pageTitle';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';
import { MEAL_CREATE_MESSAGE } from '@/constants/_toastMessage';
import { useFetchMinorCategories } from '@/hooks/menuCategory/useFetchMinorCategories';
import { useGetSearchSchool } from '@/hooks/menuCategory/useGetSearchSchool';
import { usePrefetchMinorCategories } from '@/hooks/menuCategory/usePrefetchMinorCategories';
import useNavigate from '@/hooks/useNavigate';
import { useMenualPlanStore } from '@/stores/useMenualPlanStore';
import { useToastStore } from '@/stores/useToastStore';

const MenualPlan = () => {
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
  const { setMonthMenuName, setCategory, setCalendar } = useMenualPlanStore(
    (state) => ({
      setMonthMenuName: state.setMonthMenuName,
      setCategory: state.setCategory,
      setCalendar: state.setCalendar,
    }),
  );

  const { minorCategories } = useFetchMinorCategories(
    selectedCategory.majorCategory,
  );
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

  const handleSaveMenu = (date: string, menuList: FoodInfo[]) => {
    setCalendarData((prevList) => ({
      ...prevList,
      [date]: {
        ...prevList[date],
        foods: [...menuList],
      },
    }));
  };

  const handleChangeCategory = (
    type: HandleChangeCategoryParam,
    value: string,
  ) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [type]: value,
    }));
    setIsCategoryError(false);
  };

  const handleDateClick = (date: string) => {
    if (isValidDateString(date)) setSelectedDate(date);
  };

  const isBothSelected =
    selectedCategory.majorCategory && selectedCategory.minorCategory;

  // const handleResetMenu = () => {
  //   setCalendarData({});
  //   setSelectedDate('');
  // };

  const onSubmit = (data: MealHeaderFormData) => {
    const { majorCategory, minorCategory } = selectedCategory;

    const isSelectedCategoryInvalid =
      majorCategory === '' || minorCategory === '';

    if (isSelectedCategoryInvalid) {
      showToast(MEAL_HEADER_ERROR.category.min, 'warning', 3000);
      setIsCategoryError(true);
      return;
    }

    if (!hasFoods(calendarData)) {
      showToast(MEAL_CREATE_MESSAGE.error.emptyFood, 'warning', 3000);
    } else {
      setMonthMenuName(data.monthMenuName);
      setCalendar(calendarData);
      setCategory(selectedCategory);
      navigate(ROUTES.CREATE.MENUAL);
    }
  };

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
    <div className='flex gap-8'>
      <MealForm
        legend={MEAL_FORM_LEGEND.menual.create}
        handleSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-4'>
            <H2BlackH2>{PAGE_TITLE.menualPlan.default}</H2BlackH2>
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

              <div className='relative'>
                {selectedCategory.majorCategory === MAJOR_CATEGORIES[1] && (
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
                (item) =>
                  selectedCategory.majorCategory === item.value && (
                    <Selectbox
                      key={item.value}
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
              type='submit'
              disabled={!isBothSelected}
            >
              <Subtitle2White>생성</Subtitle2White>
            </Button>
          </div>
        </div>

        <MealCalendar
          type='menualCreate'
          selectedCategory={selectedCategory}
          year={year}
          month={month}
          data={calendarData}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
          handleSaveMenu={handleSaveMenu}
        />
      </MealForm>
    </div>
  );
};

export default MenualPlan;
