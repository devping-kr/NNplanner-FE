import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import { PageHeaderTitle } from '@/components/common/Typography';

interface Props {
  title: string;
  accessBtnText: string;
  accessHandler: () => void;
}

const SurveyHeader = ({ title, accessBtnText, accessHandler }: Props) => {
  const router = useRouter();

  return (
    <div className='flex justify-between'>
      <PageHeaderTitle>{title}</PageHeaderTitle>
      <div className='flex gap-3'>
        <Button onClick={accessHandler} size='small'>
          {accessBtnText}
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => router.back()}
          size='small'
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default SurveyHeader;
