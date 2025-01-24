import { cn } from '@/utils/core';
import {
  calendarDayButtonVariants,
  calendarDayVariants,
} from '@/components/common/Calendar/Calendar.variant';
import {
  Body3Black,
  Subtitle2Black,
  Subtitle2Red500,
} from '@/components/common/Typography';

export type CalendarDayProps = {
  date: string;
  isHoliday: boolean;
  isInvalid: boolean;
  isActive: boolean;
  data: { foodId: string; foodName: string }[];
  index: number;
  totalDays: number;
  readonly?: boolean;
  onClick: () => void;
};

export const MAXIUM_MENU_PER_DAY = 7;
const DAY_COUNT_OF_A_WEEK = 7;

const CalendarDay = ({
  date,
  isHoliday,
  isInvalid,
  isActive,
  data,
  index,
  totalDays,
  readonly,
  onClick,
}: CalendarDayProps) => {
  const isLastRow =
    Math.ceil((index + 1) / DAY_COUNT_OF_A_WEEK) ===
    Math.ceil(totalDays / DAY_COUNT_OF_A_WEEK);

  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        calendarDayButtonVariants({ isInvalid, isActive, readonly }),
        'border-r border-t border-grey-100',
        index % DAY_COUNT_OF_A_WEEK === 0 && 'border-l',
        isLastRow && 'border-b',
      )}
    >
      {isHoliday ? (
        <Subtitle2Red500
          className={(calendarDayVariants({ isInvalid }), 'bg-white-100')}
        >
          {date}
        </Subtitle2Red500>
      ) : (
        <Subtitle2Black className={calendarDayVariants({ isInvalid })}>
          {date}
        </Subtitle2Black>
      )}
      <div className='w-full'>
        {data.slice(0, MAXIUM_MENU_PER_DAY).map((item, index) => (
          <Body3Black
            key={`${item.foodId}-${index}`}
            className='block w-full truncate text-nowrap'
          >
            {item.foodName}
          </Body3Black>
        ))}
      </div>
    </button>
  );
};

export default CalendarDay;
