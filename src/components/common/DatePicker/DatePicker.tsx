'use client';

import { Selectbox } from '../Selectbox';

interface Props {
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
}

const DatePicker = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: Props) => {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 15 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  return (
    <div className='flex w-full items-center gap-2'>
      <div className='flex flex-col gap-1'>
        <label className='text-xs'>년도</label>
        <Selectbox
          options={years}
          onChange={onYearChange}
          placeholder={selectedYear}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-xs'>월</label>
        <Selectbox
          options={months}
          onChange={onMonthChange}
          placeholder={selectedMonth}
        />
      </div>
    </div>
  );
};

export default DatePicker;
