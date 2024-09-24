import TextList from '../../ChartDetail/TextList';
import { DEFAULT_QUESTIONS } from '@/constants/_defaultQuestion';

const DefaultQuestions = () => {
  return (
    <div className='flex w-full'>
      <TextList list={DEFAULT_QUESTIONS} title='기본 질문' type='message' />
    </div>
  );
};

export default DefaultQuestions;
