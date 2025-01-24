import Link from 'next/link';
import Badge from '@/components/common/Badge';
import Icon from '@/components/common/Icon';
import { CardTitle } from '@/components/common/Typography';
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
  type: 'plan' | 'survey';
}

const MiniCard = ({
  title,
  icon,
  color,
  count,
  // upDownPercent,
  type,
}: Props) => {
  // const isIncrease = upDownPercent >= 0 ? true : false;

  return (
    <div className='flex w-1/4 flex-col justify-around rounded-md border border-gray-300 bg-white-100 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-3'>
          <CardTitle>{title}</CardTitle>
          <Link
            href={type === 'plan' ? NAV_LINKS[3].href : NAV_LINKS[4].href}
            className='w-fit text-3xl font-semibold underline'
          >
            {count}
          </Link>
        </div>
        <div className='flex h-full items-start justify-start'>
          <Icon name={icon} color={color} width={60} height={60} />
        </div>
      </div>
      <div className='flex items-center justify-center gap-1'>
        {/* <Icon
          name={isIncrease ? 'trendUp' : 'trendDown'}
          color={isIncrease ? 'success' : 'warning'}
          width={20}
          height={20}
        /> */}
        <Badge text='10월' textType='body' variant='blue' size='m' />
        {/* <span className='whitespace-nowrap align-middle font-semibold'>
          {`지난 달보다 `}
          <span
            className={cn(
              'text-lg',
              isIncrease ? 'text-blue-200' : 'text-red-100',
            )}
          >
            {upDownPercent}%
          </span>
          {` ${isIncrease ? '증가' : '감소'}`}
        </span> */}
      </div>
    </div>
  );
};

export default MiniCard;
