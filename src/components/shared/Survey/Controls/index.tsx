import { useRef } from 'react';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Typography';
import CustomDatePickerHeader from '@/components/shared/Survey/CustomDatePickerHeader';

interface Props {
  type: 'create' | 'edit';
  surveyName: string;
  handleSurveyNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deadLine: Date | null;
  setDeadLine?: React.Dispatch<React.SetStateAction<Date | null>>;
}

const today = new Date();

const SurveyControls = ({
  type,
  surveyName,
  handleSurveyNameChange,
  deadLine,
  setDeadLine,
}: Props) => {
  const deadLineDatePickerRef = useRef<DatePicker | null>(null);
  const isChangeable = type === 'create';

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDeadLine!(date);
    }
  };

  const handleOpenDatePicker = () => {
    deadLineDatePickerRef.current!.setFocus();
  };

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
      <div className='relative flex w-56 items-center gap-2'>
        <Label>마감 일자</Label>
        <DatePicker
          ref={deadLineDatePickerRef}
          className='flex w-28 cursor-pointer border-b border-green-400 bg-transparent pl-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-80'
          shouldCloseOnSelect
          dateFormat='yyyy-MM-dd'
          disabled={!isChangeable}
          selected={deadLine}
          locale={ko}
          minDate={today}
          onChange={handleChangeDate}
          calendarClassName='custom-calendar'
          dayClassName={() => 'custom-day'}
          placeholderText='마감날짜 선택'
          renderCustomHeader={CustomDatePickerHeader}
        />
        <button
          onClick={handleOpenDatePicker}
          disabled={!isChangeable}
          className='disabled:cursor-not-allowed'
        >
          <Icon
            name='calendar'
            width={16}
            height={16}
            color='green'
            className='absolute bottom-3 right-9'
          />
        </button>
      </div>
    </div>
  );
};

export default SurveyControls;
