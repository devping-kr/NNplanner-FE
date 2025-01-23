'use client';

import React, { useRef } from 'react';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import { cn } from '@/utils/core';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { Subtitle2Black } from '@/components/common/Typography';
import CustomDatePickerHeader from '@/components/shared/Survey/CustomDatePickerHeader';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';

interface Props {
  isChangeable: boolean;
  deadLine: Date | null;
  setDeadLine: React.Dispatch<React.SetStateAction<Date | null>>;
}

const TWO_WEEK_DAYS = 14;
const { now: twoWeeksLater } = getCurrentYearMonthNow();
twoWeeksLater.setDate(twoWeeksLater.getDate() + TWO_WEEK_DAYS);
const { now } = getCurrentYearMonthNow();

const DatepickerCalendar = ({ isChangeable, deadLine, setDeadLine }: Props) => {
  const deadLineDatePickerRef = useRef<DatePicker | null>(null);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDeadLine!(date);
    }
  };

  return (
    <div className='w-[216px]'>
      <DatePicker
        disabled={!isChangeable}
        ref={deadLineDatePickerRef}
        className='disabled:bg-grey-100 disabled:text-grey-500'
        selected={deadLine}
        minDate={now}
        onChange={handleChangeDate}
        locale={ko}
        shouldCloseOnSelect
        dateFormat='yyyy-MM-dd'
        calendarClassName='custom-calendar'
        dayClassName={() => 'custom-day'}
        enableTabLoop={false}
        renderCustomHeader={CustomDatePickerHeader}
        customInput={
          <Button
            variant='default'
            width='full'
            size='sm'
            className='relative gap-1 rounded-lg bg-white-100 py-3 pl-4 pr-[46px]'
            disabled={!isChangeable}
          >
            <Subtitle2Black
              className={cn('flex-shrink-0', !isChangeable && 'text-grey-500')}
            >
              마감 일자
            </Subtitle2Black>
            <span className='flex-1 text-base font-medium'>
              {deadLine!.toISOString().split('T')[0]}
            </span>
            <Icon
              name='calendar'
              width={20}
              height={20}
              color={!isChangeable ? 'grey500' : 'black'}
              className='absolute right-[14px]'
            />
          </Button>
        }
      />
    </div>
  );
};

export default DatepickerCalendar;
