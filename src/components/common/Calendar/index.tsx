'use client';

import { useCallback, useMemo, useState } from 'react';
import { CalendarInfo } from '@/type/mealType';
import { getAllDays, isHoliday, isInvalidDate } from '@/utils/calendar';
import { formatFullDate } from '@/utils/dayjs';
import CalendarDay from '@/components/common/CalendarDay';
import CalendarHeaderDay from '@/components/common/CalendarHeaderDay';
import { SUN_TO_SAT } from '@/constants/_calendarData';

export type CalendarProps = {
  year: number;
  month: number;
  data?: CalendarInfo;
  readonly?: boolean;
  onDateClick?: (date: string) => void;
};

const Calendar = ({
  year,
  month,
  data,
  readonly = false,
  onDateClick,
}: CalendarProps) => {
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const { allDays } = useMemo(() => {
    const allDays = getAllDays(year, month); // 유틸리티 함수 사용
    return { allDays };
  }, [year, month]);

  const handleDateClick = useCallback(
    (date: string) => {
      if (readonly) return;

      setActiveDate(date);
      onDateClick!(date);
    },
    [readonly, onDateClick],
  );

  return (
    <div className='w-full min-w-[1196px]'>
      <div className='grid w-full grid-cols-7'>
        {SUN_TO_SAT.map((day, index) => (
          <CalendarHeaderDay key={day} day={day} index={index} />
        ))}
      </div>
      <div className='grid w-full flex-grow grid-cols-7'>
        {allDays.map((date, index) => {
          const formattedDate = formatFullDate(date);
          const isActive = formattedDate === activeDate;
          return (
            <CalendarDay
              key={index}
              date={date.format('D')}
              isHoliday={isHoliday(date)}
              isInvalid={isInvalidDate(date, year, month)}
              data={data?.[formattedDate as keyof CalendarInfo]?.foods || []}
              isActive={isActive}
              index={index}
              totalDays={allDays.length}
              readonly={readonly}
              onClick={() =>
                !isInvalidDate(date, year, month) &&
                handleDateClick(formattedDate)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
