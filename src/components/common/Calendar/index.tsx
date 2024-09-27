'use client';

import { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { CalendarNutritionData } from '@/type/mealType';
import { getDaysInMonth, isHoliday, isInvalidDate } from '@/utils/calendar';
import { cn } from '@/utils/core';
import CalendarDay from '@/components/common/CalendarDay';
import { SUN_TO_SAT } from '@/constants/_calendarData';

export type CalendarProps = {
  year: number;
  month: number;
  data?: CalendarNutritionData;
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
    const days = getDaysInMonth(year, month);
    const startOfMonth = dayjs(new Date(year, month - 1)).startOf('month');
    const endOfMonth = startOfMonth.endOf('month');
    const prevMonthDays = Array.from({ length: startOfMonth.day() }, (_, i) =>
      startOfMonth.subtract(startOfMonth.day() - i, 'day'),
    );
    const nextMonthDays = Array.from({ length: 6 - endOfMonth.day() }, (_, i) =>
      endOfMonth.add(i + 1, 'day'),
    );

    const allDays = [...prevMonthDays, ...days, ...nextMonthDays];

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
    <div className='w-fit'>
      <div className='mb-2 grid grid-cols-7'>
        {SUN_TO_SAT.map((day) => (
          <div
            key={day}
            className={cn(
              'text-center font-bold text-dark-100',
              day === SUN_TO_SAT[0] && 'text-red-500',
            )}
            aria-label={`${day}요일`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className='custom-scrollbar w-160 grid h-[690px] grid-cols-7 overflow-y-scroll border-[0.5px] border-gray-200'>
        {allDays.map((date, index) => {
          const formattedDate = date.format('YYYY-MM-DD');
          const isActive = formattedDate === activeDate;

          return (
            <CalendarDay
              key={index}
              date={date.format('D')}
              isHoliday={isHoliday(date)}
              isInvalid={isInvalidDate(date, year, month)}
              data={data?.[formattedDate as keyof CalendarNutritionData] || []}
              isActive={isActive}
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
