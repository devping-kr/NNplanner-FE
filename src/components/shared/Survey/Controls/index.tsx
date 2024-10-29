import { useRef } from 'react';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Typography';
import CustomDatePickerHeader from '@/components/shared/Survey/CustomDatePickerHeader';

interface Props {
  type: 'create' | 'edit';
  surveyName: string;
  setEditSurveyName?: React.Dispatch<React.SetStateAction<string>>;
  setSurveyName?: React.Dispatch<React.SetStateAction<string>>;
  deadLine: Date | null;
  setDeadLine: React.Dispatch<React.SetStateAction<Date | null>>;
}

const EXTRA_SURVEYNAME_LIMIT = 30;

const SurveyControls = ({
  type,
  surveyName,
  setEditSurveyName,
  setSurveyName,
  deadLine,
  setDeadLine,
}: Props) => {
  const { now } = getCurrentYearMonthNow();
  const deadLineDatePickerRef = useRef<DatePicker | null>(null);
  const isChangeable = type === 'create';

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDeadLine!(date);
    }
  };

  const handleChangeSurveyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= EXTRA_SURVEYNAME_LIMIT && !isChangeable) {
      setEditSurveyName!(e.target.value);
    }
    if (e.target.value.length <= EXTRA_SURVEYNAME_LIMIT && isChangeable) {
      setSurveyName!(e.target.value);
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
          onChange={handleChangeSurveyName}
          placeholder='설문 이름을 입력하세요. (최대 30자)'
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
          selected={deadLine}
          locale={ko}
          minDate={now}
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
            color='active'
            className='absolute bottom-3 right-9'
          />
        </button>
      </div>
    </div>
  );
};

export default SurveyControls;
