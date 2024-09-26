import Icon from '@/components/common/Icon';

interface Props {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

const CustomDatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: Props) => (
  <div className='mb-2 flex items-center justify-between px-6 font-semibold'>
    <button
      onClick={decreaseMonth}
      className={prevMonthButtonDisabled ? 'invisible' : 'block'}
      disabled={prevMonthButtonDisabled}
    >
      <Icon name='arrowPrev' width={20} color='active' />
    </button>
    <div className='text-base font-bold'>
      {date.getFullYear()}
      {'년 '}
      {date.toLocaleString('default', { month: 'long' })}
    </div>
    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      <Icon name='arrowNext' width={20} color='active' />
    </button>
  </div>
);

export default CustomDatePickerHeader;
