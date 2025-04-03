import { Question } from '@/type/survey/surveyResponse';
import { Body3BlackLabel } from '@/components/common/Typography';

interface Props {
  option: number;
  question: Question;
  answers: { [key: number]: number | string | string[] };
  handleChange: (
    questionId: number,
    value: number | string,
    idx: number,
    answerType: 'text' | 'radio',
    subIdx?: number,
  ) => void;
}

const Radio = ({ option, question, answers, handleChange }: Props) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <label className='relative flex h-5 w-5 cursor-pointer items-center justify-center'>
        <input
          type='radio'
          name={`question${question.questionId}`}
          id={`${question.questionId}_${option}`}
          value={option}
          checked={answers[question.questionId] === option}
          onChange={() =>
            handleChange(question.questionId, option, 4, question.answerType)
          }
          className='peer sr-only'
        />
        <span className='absolute h-5 w-5 rounded-full border border-grey-300 bg-white-100 peer-hover:border-2 peer-hover:border-grey-500'></span>
        <span className='absolute h-5 w-5 rounded-full border-[6px] border-transparent peer-checked:border-green-500'></span>
        <span className='absolute h-5 w-5 rounded-full peer-checked:ring-green-500 peer-focus:ring-4 peer-focus:ring-green-100'></span>
      </label>
      <Body3BlackLabel
        htmlFor={`${question.questionId}_${option}`}
      >{`${option}점`}</Body3BlackLabel>
    </div>
  );
};

export default Radio;
