import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import DatepickerCalendar from '@/components/common/DatepickerCalendar';
import { Input } from '@/components/common/Input';
import {
  Subtitle2Green500,
  Subtitle2White,
} from '@/components/common/Typography';

interface Props {
  isChangeable: boolean;
  surveyName: string;
  setEditSurveyName?: React.Dispatch<React.SetStateAction<string>>;
  setSurveyName?: React.Dispatch<React.SetStateAction<string>>;
  deadLine: Date | null | string;
  setDeadLine: React.Dispatch<React.SetStateAction<Date | null | string>>;
  accessBtnText: string;
  accessHandler: () => void;
}

const EXTRA_SURVEYNAME_LIMIT = 30;

const SurveyControls = ({
  isChangeable,
  surveyName,
  setEditSurveyName,
  setSurveyName,
  deadLine,
  setDeadLine,
  accessBtnText,
  accessHandler,
}: Props) => {
  const router = useRouter();

  const handleChangeSurveyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= EXTRA_SURVEYNAME_LIMIT && !isChangeable) {
      setEditSurveyName!(e.target.value);
    }
    if (e.target.value.length <= EXTRA_SURVEYNAME_LIMIT && isChangeable) {
      setSurveyName!(e.target.value);
    }
  };

  return (
    <div className='flex h-12 gap-4'>
      <div className='w-64'>
        <Input
          variant='white'
          value={surveyName}
          onChange={handleChangeSurveyName}
          placeholder='설문 이름을 입력하세요.(최대 30자)'
        />
      </div>
      <DatepickerCalendar
        isChangeable={isChangeable}
        deadLine={deadLine}
        setDeadLine={setDeadLine}
      />
      <div className='flex gap-2'>
        <Button
          onClick={accessHandler}
          size='sm'
          disabled={surveyName === '' || deadLine === null}
          className='rounded-lg'
        >
          <Subtitle2White>{accessBtnText}</Subtitle2White>
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => router.back()}
          size='sm'
          className='rounded-lg'
        >
          <Subtitle2Green500>취소</Subtitle2Green500>
        </Button>
      </div>
    </div>
  );
};

export default SurveyControls;
