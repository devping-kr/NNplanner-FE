'use client';

import Button from '@/components/common/Button/Button';
import Calendar, { CalendarProps } from '@/components/common/Calendar';
import { MealCalenderTitle } from '@/components/common/Typography';
import MealEdit from '@/components/shared/Meal/MealEdit';
import NutritionInfo, {
  NutritionData,
} from '@/components/shared/Meal/NutritionInfo';

export type Category = {
  organization: string;
  organizationDetail: string;
};

type MealCalendarProps = {
  type?: 'default' | 'create' | 'edit';
  selectedCategory?: Category;
  isValid?: boolean;
  selectedDate?: string;
  handleChangeMenu?: (
    date: string,
    menuName: string,
    updatedItem: NutritionData,
  ) => void;
  handleResetMenu?: () => void;
} & CalendarProps;

const MealCalendar = ({
  type = 'default',
  selectedDate,
  year,
  month,
  data,
  readonly,
  onDateClick,
  handleChangeMenu,
  handleResetMenu,
}: MealCalendarProps) => {
  return (
    <div className='flex gap-8'>
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
              <Button className='h-10 w-fit' size='basic' type='button'>
                취소
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
                메뉴초기화
              </Button>
              <Button className='h-10 w-fit' size='basic' type='submit'>
                수정 완료
              </Button>
              <Button className='h-10 w-fit' size='basic' type='button'>
                취소
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
      {(type === 'create' || type === 'edit') && selectedDate && data && (
        <div className='mt-[56px]'>
          {type === 'create' && (
            <NutritionInfo date={selectedDate} data={data[selectedDate]} />
          )}
          {type === 'edit' && (
            <MealEdit
              date={selectedDate}
              data={data[selectedDate]}
              handleChangeMenu={handleChangeMenu}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MealCalendar;
