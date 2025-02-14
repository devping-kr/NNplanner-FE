'use client';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import { Selectbox } from '@/components/common/Selectbox';

interface Props {
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
}

const TOTAL_YEAR_OPTIONS = 15;
const TOTAL_MONTH_OPTIONS = 12;

const DatePicker = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: Props) => {
  const { year: currentYear } = getCurrentYearMonthNow();

  const years = Array.from({ length: TOTAL_YEAR_OPTIONS }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));

  const months = Array.from({ length: TOTAL_MONTH_OPTIONS }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  return (
    <div className='flex w-full items-center gap-2'>
      <div className='flex w-[194px] flex-col gap-1'>
        <Selectbox
          options={years}
          onChange={onYearChange}
          placeholder='년도'
          selectedValue={selectedYear.toString()}
          className='flex justify-start'
          buttonSize='sm'
        />
      </div>
      <div className='flex w-[194px] flex-col gap-1'>
        <Selectbox
          options={months}
          onChange={onMonthChange}
          placeholder='월'
          selectedValue={selectedMonth.toString()}
          className='flex justify-start'
          buttonSize='sm'
        />
      </div>
    </div>
  );
};

export default DatePicker;
