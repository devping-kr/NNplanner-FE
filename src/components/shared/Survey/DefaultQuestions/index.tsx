import { useRouter } from 'next/navigation';
import TextList from '../../ChartDetail/TextList';
import Button from '@/components/common/Button/Button';
import { DEFAULT_QUESTIONS } from '@/constants/_defaultQuestion';

interface Props {
  submitSurvey: () => void;
}

const DefaultQuestions = ({ submitSurvey }: Props) => {
  const router = useRouter();

  return (
    <div className='flex w-full gap-5'>
      <div className='w-full'>
        <TextList list={DEFAULT_QUESTIONS} title='기본 질문' type='message' />
      </div>
      <div className='flex w-1/5 flex-col gap-3'>
        <Button onClick={submitSurvey}>설문 생성</Button>
        <Button variant={'secondary'} onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default DefaultQuestions;
