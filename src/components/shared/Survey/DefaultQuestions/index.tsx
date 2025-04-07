import TextList from '@/components/shared/ChartDetail/TextList';
import { DEFAULT_QUESTIONS } from '@/constants/_defaultQuestion';

const DefaultQuestions = () => {
  return (
    <div className='flex max-h-[346px] w-full'>
      <TextList list={DEFAULT_QUESTIONS} title='기본 질문' type='message' />
    </div>
  );
};

export default DefaultQuestions;
