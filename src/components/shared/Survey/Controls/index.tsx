import DatepickerCalendar from '@/components/common/DatepickerCalendar';
import { Input } from '@/components/common/Input';

interface Props {
  isChangeable: boolean;
  surveyName: string;
  setEditSurveyName?: React.Dispatch<React.SetStateAction<string>>;
  setSurveyName?: React.Dispatch<React.SetStateAction<string>>;
  deadLine: Date | null;
  setDeadLine: React.Dispatch<React.SetStateAction<Date | null>>;
}

const EXTRA_SURVEYNAME_LIMIT = 30;

const SurveyControls = ({
  isChangeable,
  surveyName,
  setEditSurveyName,
  setSurveyName,
  deadLine,
  setDeadLine,
}: Props) => {
  const handleChangeSurveyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= EXTRA_SURVEYNAME_LIMIT && !isChangeable) {
      setEditSurveyName!(e.target.value);
    }
    if (e.target.value.length <= EXTRA_SURVEYNAME_LIMIT && isChangeable) {
      setSurveyName!(e.target.value);
    }
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
      <DatepickerCalendar
        isChangeable={isChangeable}
        deadLine={deadLine}
        setDeadLine={setDeadLine}
      />
    </div>
  );
};

export default SurveyControls;
