import { calendarDayVariants } from '@/components/Calendar/Calendar.variant';

export type CalendarDayProps = {
  date: string;
  isHoliday: boolean;
  isInvalid: boolean;
  isActive: boolean;
  data: Array<{ id: string; content: string }>;
  readonly?: boolean;
  onClick: () => void;
};

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
      className={calendarDayVariants({ isInvalid, isActive, readonly })}
      onClick={onClick}
    >
      <div
        className={`text-left font-bold ${isHoliday ? 'text-red-500' : 'test-back'}`}
      >
        {date}
      </div>
      <div className='mt-0.5'>
        {data.slice(0, 6).map((item) => (
          <div key={item.id} className='py-0.5 text-sm'>
            {item.content}
          </div>
        ))}
      </div>
    </button>
  );
};

export default CalendarDay;
