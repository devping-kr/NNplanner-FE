import { useRef } from 'react';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Typography';

interface Props {
  type: 'create' | 'edit';
  surveyName: string;
  handleSurveyNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deadLine: Date | null;
  setDeadLine?: React.Dispatch<React.SetStateAction<Date | null>>;
}

const twoWeekDays = 14;
const today = new Date();
const twoWeeksLater = new Date();
twoWeeksLater.setDate(twoWeeksLater.getDate() + twoWeekDays);

const SurveyControls = ({
  type,
  surveyName,
  handleSurveyNameChange,
  deadLine,
  setDeadLine,
}: Props) => {
  const deadLineDatePickerRef = useRef<DatePicker | null>(null);
  const isChangeable = type === 'create';

  return (
    <div className='flex gap-4'>
      <div className='w-1/3'>
        <Input
          value={surveyName}
          onChange={handleSurveyNameChange}
          disabled={!isChangeable}
          placeholder='설문 이름을 입력하세요.'
          className='font-semibold'
          bgcolor='meal'
          height='basic'
        />
      </div>
      <div className='relative flex w-1/2 max-w-fit items-center'>
        <Label>마감 일자</Label>
        <DatePicker
          ref={deadLineDatePickerRef}
          className='ml-2 cursor-pointer border-b border-green-400 bg-transparent pb-1 pl-1 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400'
          shouldCloseOnSelect
          dateFormat='yyyy-MM-dd'
          disabled={!isChangeable}
          selected={deadLine}
          locale={ko}
          minDate={today}
          onChange={
            isChangeable
              ? (date) => {
                  setDeadLine!(date);
                }
              : undefined
          }
          calendarClassName='custom-calendar'
          dayClassName={() => 'custom-day'}
          placeholderText='마감날짜 선택'
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className='mb-2 flex items-center justify-between px-6 font-semibold'>
              <button
                onClick={decreaseMonth}
                className={prevMonthButtonDisabled ? 'invisible' : 'block'}
                disabled={prevMonthButtonDisabled}
              >
                <Icon name='arrowPrev' width={20} color='green' />
              </button>
              <div className='text-base font-bold'>
                {date.getFullYear()}
                {'년 '}
                {date.toLocaleString('default', { month: 'long' })}
              </div>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <Icon name='arrowNext' width={20} color='green' />
              </button>
            </div>
          )}
        />
        <button
          onClick={() => deadLineDatePickerRef.current!.setFocus()}
          disabled={!isChangeable}
          className='disabled:cursor-not-allowed'
        >
          <Icon
            name='calendar'
            width={16}
            height={16}
            color='green'
            className='absolute bottom-3 right-2'
          />
        </button>
      </div>
    </div>
  );
};

export default SurveyControls;
