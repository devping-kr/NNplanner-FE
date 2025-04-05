'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { mealHeaderSchema } from '@/schema/mealSchema';
import { CalendarInfo, MealHeaderForm } from '@/type/mealType';
import { MajorCategory } from '@/type/menu/menuRequest';
import { FoodInfo, MenuResponseDTO } from '@/type/menu/menuResponse';
import {
  HandleChangeCategoryParam,
  SelectedCategory,
} from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import {
  getYearAndMonth,
  isValidDateString,
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
  H2BlackH2,
  Subtitle2Green500,
  Subtitle2Grey900,
  Subtitle2White,
} from '@/components/common/Typography';
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
import { usePutMonthMenus } from '@/hooks/menu/usePutMonthMenus';
import { useFetchMinorCategories } from '@/hooks/menuCategory/useFetchMinorCategories';
import { useGetSearchSchool } from '@/hooks/menuCategory/useGetSearchSchool';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';

type MealPlanEditProps = {
  id: string;
};

/**
 * @description 식단 수정 페이지
 */
const MealPlanEdit = ({ id: monthMenuId }: MealPlanEditProps) => {
  const [cachedCalendarData, setCachedCalendarData] = useState<CalendarInfo>(
    {},
  );
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
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
  const showToast = useToastStore((state) => state.showToast);
  const { navigate, handleBack } = useNavigate();

  const queryClient = useQueryClient();
  const { minorCategories } = useFetchMinorCategories(
    selectedCategory.majorCategory,
  );
  const { mutate: putMutate } = usePutMonthMenus();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<MealHeaderForm>({
    resolver: zodResolver(mealHeaderSchema),
    mode: 'onChange',
    defaultValues: {
      monthMenuName: '',
      schoolName: '',
    },
  });

  const handleChangeMenu = (
    date: string,
    menuName: string,
    updatedItem: FoodInfo,
  ) => {
    setCalendarData((prevList) => {
      if (!prevList[date]) {
        return prevList;
      }

      return {
        ...prevList,
        [date]: {
          ...prevList[date],
          foods: prevList[date].foods.map((item) =>
            item.foodName === menuName ? { ...item, ...updatedItem } : item,
          ),
        },
      };
    });
  };

  const handleChangeCategory = (
    type: HandleChangeCategoryParam,
    value: string,
  ) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleDateClick = (date: string) => {
    if (isValidDateString(date)) setSelectedDate(date);
  };

  /**
   * @description 식단 수정 페이지 - 수정 완료 버튼 눌렀을 때 실행
   */
  const onSubmit = (data: MealHeaderFormData) => {
    const { majorCategory, minorCategory } = selectedCategory;

    const isSelectedCategoryInvalid =
      majorCategory === '' || minorCategory === '';

    if (isSelectedCategoryInvalid) {
      showToast(MEAL_HEADER_ERROR.category.min, 'warning', 3000);
      setIsCategoryError(true);
      return;
    }

    const formattedData = transformCalendarToPostSave(
      cachedCalendarData,
      data.monthMenuName,
      selectedCategory.majorCategory as MajorCategory,
      selectedCategory.minorCategory,
      calendarData,
    );
    putMutate(
      {
        request: formattedData,
        monthMenuId,
      },
      {
        onSuccess: ({ message }: Result<MenuResponseDTO>, variables) => {
          showToast(message, 'success', 1000);
          queryClient.invalidateQueries({
            queryKey: ['monthMenuDetail', variables.monthMenuId],
          });
          navigate(`${ROUTES.VIEW.PLAN}/${monthMenuId}`);
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error?.response?.data?.message || '식단 수정 실패';
          showToast(errorMessage, 'warning', 1000);
        },
      },
    );
  };

  /**
   * @description 식단 수정 페이지 - 수정 실패 시 실행
   */
  const onError = () => {
    if (errors.monthMenuName) {
      showToast(MEAL_HEADER_ERROR.name.min, 'warning', 3000);
      return;
    }
  };

  // 쿼리키로 캐싱해둔 식단 상세 정보 가져옴
  const getOriginalCalendar = () => {
    const cachedMealPlanData = queryClient.getQueryData<
      Result<MenuResponseDTO>
    >(['monthMenuDetail', monthMenuId]);

    if (!cachedMealPlanData) return;
    const {
      createAt,
      majorCategory,
      minorCategory,
      monthMenuName,
      monthMenuList,
    } = cachedMealPlanData.data;
    reset({
      monthMenuName: monthMenuName,
      schoolName: minorCategory,
    });
    const { year, month } = getYearAndMonth(createAt);
    setYear(year);
    setMonth(month);
    const cachedCalendarData = transformResponseToCalendar(
      year,
      month,
      monthMenuList,
      'detail',
    );
    setCalendarData(cachedCalendarData);
    setCachedCalendarData(cachedCalendarData);
    setSelectedCategory({
      majorCategory: majorCategory,
      minorCategory: minorCategory,
    });
  };

  useEffect(() => {
    getOriginalCalendar();
  }, []);

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

  if (!calendarData) {
    return <div>로딩 중...</div>;
  }

  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.mealPlan.edit}
      handleSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex items-center gap-4'>
          <H2BlackH2>{PAGE_TITLE.mealPlan.edit}</H2BlackH2>
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
              (organization) =>
                selectedCategory.majorCategory === organization.value &&
                selectedCategory.majorCategory !== MAJOR_CATEGORIES[1] && (
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

          <div className='flex gap-4'>
            <div className='flex w-fit items-center gap-2'>
              <Button variant='primary' size='sm' type='submit'>
                <Subtitle2White>수정 완료</Subtitle2White>
              </Button>
              <Button variant='secondary' size='sm' onClick={handleBack}>
                <Subtitle2Green500>취소</Subtitle2Green500>
              </Button>
            </div>
            <Button variant='grey' size='sm'>
              <Subtitle2Grey900>메뉴 초기화</Subtitle2Grey900>
            </Button>
          </div>
        </div>
      </div>
      <MealCalendar
        type='edit'
        year={year}
        month={month}
        data={calendarData}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
        handleChangeMenu={handleChangeMenu}
      />
    </MealForm>
  );
};

export default MealPlanEdit;
