import { cn } from '@/utils/core';
import { calendarDayVariants } from '@/components/common/Calendar/Calendar.variant';

export type CalendarDayProps = {
  date: string;
  isHoliday: boolean;
  isInvalid: boolean;
  isActive: boolean;
  data: { foodId: string; foodName: string }[];
  readonly?: boolean;
  onClick: () => void;
};

export const MAXIUM_MENU_PER_DAY = 7;

const CalendarDay = ({
  date,
  isHoliday,
  isInvalid,
  isActive,
  data,
  readonly,
  onClick,
}: CalendarDayProps) => {
  return (
    <button
      className={cn(
        calendarDayVariants({ isInvalid, isActive, readonly }),
        isHoliday ? 'text-red-500' : 'test-dark-100',
      )}
      type='button'
      onClick={onClick}
    >
      <div className={`text-left font-bold`}>{date}</div>
      <div className='mt-[0.5] w-full text-dark-100'>
        {data.slice(0, MAXIUM_MENU_PER_DAY).map((item, index) => (
          <span
            key={`${item.foodId}-${index}`}
            className='block w-full truncate text-sm'
          >
            {item.foodName}
          </span>
        ))}
      </div>
    </button>
  );
};

export default CalendarDay;
