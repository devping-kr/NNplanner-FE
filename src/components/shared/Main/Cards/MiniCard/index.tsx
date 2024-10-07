import Link from 'next/link';
import Icon from '@/components/common/Icon';
import { NAV_LINKS } from '@/constants/_navbar';

interface Props {
  title: string;
  icon: string;
  color?:
    | 'warning'
    | 'white'
    | 'black'
    | 'normal'
    | 'success'
    | 'active'
    | undefined;
  count: number;
  upDownPercent: number;
}

const MiniCard = ({ title, icon, color, count, upDownPercent }: Props) => {
  const isIncrease = upDownPercent >= 0 ? true : false;

  return (
    <div className='flex w-1/4 flex-col gap-6 rounded-md border border-gray-300 bg-white-100 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-3'>
          <span className='text-xl font-semibold'>{title}</span>
          <Link
            href={NAV_LINKS[3].href}
            className='w-fit text-3xl font-semibold underline'
          >
            {count}
          </Link>
        </div>
        <div className='flex items-center justify-center rounded-2xl bg-green-400 bg-opacity-50 p-3'>
          <Icon name={icon} color={color} width={20} height={20} />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Icon
          name={isIncrease ? 'trendUp' : 'trendDown'}
          color={isIncrease ? 'success' : 'warning'}
          width={15}
          height={15}
        />
        <span className='font-semibold'>
          {`지난 달보다 `}
          <span className='text-green-700'>{upDownPercent}%</span>
          {` ${isIncrease ? '증가' : '감소'}`}
        </span>
      </div>
    </div>
  );
};

export default MiniCard;
