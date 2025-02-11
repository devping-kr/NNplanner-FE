import Link from 'next/link';
import Badge from '@/components/common/Badge';
import Icon from '@/components/common/Icon';
import {
  Body3Grey600,
  H1Black,
  SubTitle1Black,
} from '@/components/common/Typography';
import { NAV_LINKS } from '@/constants/_navbar';

interface Props {
  title: string;
  icon: string;
  count: number;
  upDownPercent: number;
  type: 'plan' | 'survey';
}

// TODO: 추후 최근 3개월까지의 식단 개수를 받아오는 api완성 후 교체예정
const MONTH = ['10월', '11월', '12월'];

const MiniCard = ({
  title,
  icon,
  count,
  // upDownPercent,
  type,
}: Props) => {
  // const isIncrease = upDownPercent >= 0 ? true : false;

  return (
    <div className='relative flex h-[342px] w-full max-w-[322px] flex-col justify-between rounded-2xl bg-white-100 p-6'>
      <div className='absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-grey-50'>
        <Icon name={icon} width={24} height={24} color='grey900' />
      </div>
      <div className='w-full'>
        <SubTitle1Black>{title}</SubTitle1Black>
      </div>
      <Link
        href={type === 'plan' ? NAV_LINKS[3].href : NAV_LINKS[4].href}
        className='w-full text-3xl font-semibold'
      >
        <H1Black>{count}</H1Black>
      </Link>
      <div className='flex w-full flex-col items-center justify-center gap-2'>
        {MONTH.map((month) => (
          <div key={month} className='flex w-full items-center gap-4'>
            <Badge text={month} textType='body' variant='default' size='m' />
            <Body3Grey600>nn개의 식단을 관리했어요.</Body3Grey600>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCard;
