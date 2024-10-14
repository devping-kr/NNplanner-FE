'use client';

import { FoodInfo } from '@/type/menu/menuResponse';
import { SelectedCategory } from '@/type/menuCategory/category';
import Button from '@/components/common/Button/Button';
import Calendar, { CalendarProps } from '@/components/common/Calendar';
import { MealCalenderTitle } from '@/components/common/Typography';
import MealCreate from '@/components/shared/Meal/MealCreate';
import MealEdit from '@/components/shared/Meal/MealEdit';
import NutritionInfo from '@/components/shared/Meal/NutritionInfo';
import useNavigate from '@/hooks/useNavigate';

type MealCalendarProps = {
  type?: 'default' | 'create' | 'edit' | 'menualCreate' | 'mealPlan';
  selectedCategory?: SelectedCategory;
  selectedDate?: string;
  handleChangeMenu?: (
    date: string,
    menuName: string,
    updatedItem: FoodInfo,
    type: 'edit' | 'add',
  ) => void;
  handleResetMenu?: () => void;
  handleSaveMenu?: (date: string, menuList: FoodInfo[]) => void;
  handleEditMenu?: () => void;
} & CalendarProps;

const MealCalendar = ({
  type = 'default',
  selectedDate = '',
  year,
  month,
  data,
  readonly,
  onDateClick,
  handleChangeMenu,
  handleResetMenu,
  handleSaveMenu,
  handleEditMenu,
}: MealCalendarProps) => {
  const { handleBack } = useNavigate();
  return (
    <div className='flex'>
      <div className='flex w-fit flex-col gap-2'>
        <div className='flex w-full items-center justify-between'>
          <MealCalenderTitle>{month}월</MealCalenderTitle>
          {type === 'default' && (
            <Button className='h-10 w-fit' size='basic' type='submit'>
              생성
            </Button>
          )}
          {type === 'create' && (
            <div className='flex w-fit items-center gap-2'>
              <Button className='h-10 w-fit' size='basic' type='submit'>
                저장
              </Button>
              <Button
                className='h-10 w-fit'
                size='basic'
                type='button'
                onClick={handleEditMenu}
              >
                메뉴 수정
              </Button>
            </div>
          )}
          {type === 'edit' && (
            <div className='flex w-fit items-center gap-2'>
              <Button
                className='h-10 w-fit'
                size='basic'
                variant='outline'
                type='button'
                onClick={handleResetMenu}
              >
                메뉴 초기화
              </Button>
              <Button className='h-10 w-fit' size='basic' type='submit'>
                수정 완료
              </Button>
              <Button
                className='h-10 w-fit'
                size='basic'
                type='button'
                onClick={handleBack}
              >
                취소
              </Button>
            </div>
          )}
          {type === 'menualCreate' && (
            <div className='flex w-fit items-center gap-2'>
              <Button
                className='h-10 w-fit'
                size='basic'
                variant='outline'
                type='button'
                onClick={handleResetMenu}
              >
                메뉴 초기화
              </Button>
              <Button className='h-10 w-fit' size='basic' type='submit'>
                생성
              </Button>
            </div>
          )}
          {type === 'mealPlan' && (
            <div className='flex w-fit items-center gap-2'>
              <Button
                className='h-10 w-fit'
                size='basic'
                variant='outline'
                type='submit'
              >
                엑셀 저장
              </Button>
              <Button className='h-10 w-fit' size='basic' type='button'>
                수정
              </Button>
              <Button className='h-10 w-fit' size='basic' type='button'>
                삭제
              </Button>
            </div>
          )}
        </div>
        <Calendar
          year={year}
          month={month}
          data={data}
          readonly={readonly}
          onDateClick={onDateClick}
        />
      </div>
      {selectedDate && (type === 'create' || type === 'mealPlan') && data && (
        <NutritionInfo date={selectedDate} data={data[selectedDate].foods} />
      )}
      {selectedDate && type === 'edit' && data && (
        <MealEdit
          date={selectedDate}
          data={data[selectedDate].foods}
          handleChangeMenu={handleChangeMenu}
        />
      )}
      {selectedDate && type === 'menualCreate' && (
        <MealCreate date={selectedDate} handleSaveMenu={handleSaveMenu} />
      )}
    </div>
  );
};

export default MealCalendar;
