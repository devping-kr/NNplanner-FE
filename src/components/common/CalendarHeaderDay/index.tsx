import React from 'react';
import { cn } from '@/utils/core';
import { Subtitle2Black, Subtitle2Red500 } from '../Typography';
import { SUN_TO_SAT } from '@/constants/_calendarData';

const FIRST_DAY_OF_MONTH_INDEX = 0;
const LAST_DAY_OF_WEEK_INDEX = 6;

type Props = {
  day: string;
  index: number;
};

const CalendarHeaderDay = ({ day, index }: Props) => {
  return (
    <div
      className={cn(
        'flex h-10 flex-col items-center justify-center border-r border-t border-grey-100 bg-white-100',
        index === LAST_DAY_OF_WEEK_INDEX && 'border-r',
        index === FIRST_DAY_OF_MONTH_INDEX && 'border-l',
        '',
      )}
      aria-label={`${day}요일`}
    >
      {day === SUN_TO_SAT[0] ? (
        <Subtitle2Red500>{day}</Subtitle2Red500>
      ) : (
        <Subtitle2Black>{day}</Subtitle2Black>
      )}
    </div>
  );
};

export default CalendarHeaderDay;
