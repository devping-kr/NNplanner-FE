import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { SubTitle1Black } from '@/components/common/Typography';

interface Props {
  date: Date | null;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

const CustomDatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
}: Props) => (
  <div className='mb-3 flex items-center justify-between'>
    <Button variant='default' onClick={decreaseMonth} className='p-0'>
      <Icon name='arrowPrev' width={20} height={20} color='black' />
    </Button>
    <SubTitle1Black>
      {date instanceof Date && !isNaN(date.getTime())
        ? `${date.getFullYear()}년 ${date.toLocaleString('ko-KR', { month: 'long' })}`
        : '날짜 정보 없음'}
    </SubTitle1Black>
    <Button variant='default' onClick={increaseMonth} className='p-0'>
      <Icon name='arrowNext' width={20} height={20} color='black' />
    </Button>
  </div>
);

export default CustomDatePickerHeader;
