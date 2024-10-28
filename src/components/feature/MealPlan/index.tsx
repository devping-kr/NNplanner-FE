'use client';

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { SelectedCategory } from '@/type/menuCategory/category';
import { FailResponse, Result } from '@/type/response';
import { getYearAndMonth, transformResponseToCalendar } from '@/utils/calendar';
import { exportMenuToExcel } from '@/utils/xslx';
import MealForm from '@/components/common/MealForm';
import MealCalendar from '@/components/shared/Meal/MealCalender';
import MealPlanHeader from '@/components/shared/MealPlanHeader';
import { MEAL_FORM_LEGEND } from '@/constants/_MealForm';
import { ROUTES } from '@/constants/_navbar';
import { useDeleteMonthMenu } from '@/hooks/menu/useDeleteMonthMenu';
import { useGetMonthMenuDetails } from '@/hooks/menu/useGetMonthMenuDetail';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';

type MealPlanProps = {
  id: string;
};

const MealPlan = ({ id }: MealPlanProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { navigate } = useNavigate();
  const showToast = useToastStore((set) => set.showToast);
  const { data, refetch, isLoading } = useGetMonthMenuDetails({
    monthMenuId: id,
  });
  const { mutate: deleteMenuMutate } = useDeleteMonthMenu();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const monthMenuDetail = data?.data;

  if (isLoading || !monthMenuDetail) {
    return <div>Loading...</div>; // 로딩 상태 처리
  }

  const { year, month } = getYearAndMonth(monthMenuDetail.createAt);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleCreateSurvey = () => {
    navigate(`${ROUTES.SURVEY.CREATE}/${id}`);
  };

  const handleSaveExcel = () => {
    exportMenuToExcel(monthMenuDetail);
  };

  const handleEditMenu = () => {
    navigate(`${ROUTES.VIEW.PLAN}/${id}${ROUTES.EDIT.EDIT}`);
  };

  const handleDeleteMenu = () => {
    deleteMenuMutate(
      { monthMenuId: id },
      {
        onSuccess: ({ message }: Result<null>) => {
          showToast(message, 'success', 1000);
          navigate(ROUTES.VIEW.PLAN);
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error?.response?.data?.message || '식단 삭제 실패';
          showToast(errorMessage, 'warning', 1000);
        },
      },
    );
  };

  const selectedCategory = {
    majorCategory: monthMenuDetail.majorCategory,
    minorCategory: monthMenuDetail.minorCategory,
  } as SelectedCategory;

  const calendarData = transformResponseToCalendar(
    year,
    month,
    monthMenuDetail.monthMenuList,
    'detail',
  );

  return (
    <MealForm
      legend={MEAL_FORM_LEGEND.autoPlan.create}
      handleSubmit={handleSubmit}
    >
      <MealPlanHeader
        mealName={monthMenuDetail.monthMenuName || ''}
        selectedCategory={selectedCategory}
      />
      <MealCalendar
        type='mealPlan'
        data={calendarData}
        year={year}
        month={month}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
        handleCreateSurvey={handleCreateSurvey}
        handleSaveExcel={handleSaveExcel}
        handleEditMenu={handleEditMenu}
        handleDeleteMenu={handleDeleteMenu}
      />
    </MealForm>
  );
};

export default MealPlan;
