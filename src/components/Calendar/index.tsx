import { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getDaysInMonth, isHoliday, isInvalidDate } from '@/utils/calendar';
import CalendarDay from '@/components/CalendarDay';

export type CalendarData = {
  [date: `${number}-${number}-${number}`]: Array<{
    id: string;
    content: string;
  }>;
};

export type CalendarProps = {
  year: number;
  month: number;
  data: CalendarData;
  readonly?: boolean;
  onDateClick: (date: string) => void;
};

const SUN_TO_SAT = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({
  year,
  month,
  data,
  readonly = false,
  onDateClick,
}: CalendarProps) => {
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const { days, prevMonthDays, nextMonthDays } = useMemo(() => {
    const days = getDaysInMonth(year, month);
    const startOfMonth = dayjs(new Date(year, month - 1)).startOf('month');
    const endOfMonth = dayjs(new Date(year, month - 1)).endOf('month');

    const prevMonthDays = Array.from({ length: startOfMonth.day() }, (_, i) =>
      startOfMonth.subtract(startOfMonth.day() - i, 'day'),
    );

    const nextMonthDays = Array.from({ length: 6 - endOfMonth.day() }, (_, i) =>
      endOfMonth.add(i + 1, 'day'),
    );

    return { days, prevMonthDays, nextMonthDays };
  }, [year, month]);

  const allDays = useMemo(
    () => [...prevMonthDays, ...days, ...nextMonthDays],
    [prevMonthDays, days, nextMonthDays],
  );

  const handleDateClick = useCallback(
    (date: string) => {
      if (!readonly) {
        setActiveDate(date);
        onDateClick(date);
      }
    },
    [readonly, onDateClick],
  );

  return (
    <div className='w-fit'>
      <div className='mb-2 grid grid-cols-7'>
        {SUN_TO_SAT.map((day) => (
          <div
            key={day}
            className='text-center font-bold text-label'
            aria-label={`${day}요일`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 overflow-hidden rounded-md'>
        {allDays.map((date, index) => {
          const formattedDate = date.format('YYYY-MM-DD');
          const isActive = formattedDate === activeDate;

          return (
            <CalendarDay
              key={index}
              date={date.format('D')}
              isHoliday={isHoliday(date)}
              isInvalid={isInvalidDate(date, year, month)}
              data={data[formattedDate as keyof CalendarData] || []}
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
