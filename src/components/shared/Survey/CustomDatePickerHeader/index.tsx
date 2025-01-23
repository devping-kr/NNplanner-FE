import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { SubTitle1Black } from '@/components/common/Typography';

interface Props {
  date: Date | null;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  nextMonthButtonDisabled: boolean;
}

const CustomDatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  nextMonthButtonDisabled,
}: Props) => (
  <div className='mb-3 flex items-center justify-between font-semibold'>
    <Button variant='default' onClick={decreaseMonth} className='p-0'>
      <Icon name='arrowPrev' width={20} height={20} color='black' />
    </Button>
    <SubTitle1Black>
      {date instanceof Date && !isNaN(date.getTime())
        ? `${date.getFullYear()}년 ${date.toLocaleString('ko-KR', { month: 'long' })}`
        : '날짜 정보 없음'}
    </SubTitle1Black>
    <button
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className='p-0'
    >
      <Icon name='arrowNext' width={20} height={20} color='black' />
    </button>
  </div>
);

export default CustomDatePickerHeader;
