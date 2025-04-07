import { cn } from '@/utils/core';
import { Body2Black } from '../Typography';
import Icon from '@/components/common/Icon';

type InfoCardProps = {
  message: string;
  className?: string;
};

const ICON_SIZE = 24;

const InfoCard = ({ message, className }: InfoCardProps) => {
  return (
    <div
      className={cn(
        'whitespace-wrap flex h-fit w-80 items-center gap-2 overflow-hidden break-all rounded-md border border-grey-100 bg-blue-50 p-4',
        className,
      )}
    >
      <div className='h-fit w-fit'>
        <Icon name='info' color='black' width={ICON_SIZE} height={ICON_SIZE} />
      </div>
      <Body2Black>{message}</Body2Black>
    </div>
  );
};

export default InfoCard;
