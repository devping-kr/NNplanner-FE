import { cn } from '@/utils/core';
import Icon from '@/components/common/Icon';

type InfoCardProps = {
  message: string;
  className?: string;
};
const InfoCard = ({ message, className }: InfoCardProps) => {
  return (
    <div
      className={cn(
        'whitespace-wrap flex h-fit w-80 items-center gap-2 overflow-hidden break-all rounded-md border-[1px] border-green-300 bg-white-100 p-4',
        className,
      )}
    >
      <div className='w-fit'>
        <Icon name='normal' />
      </div>
      <span className='font-medium'>{message}</span>
    </div>
  );
};

export default InfoCard;
