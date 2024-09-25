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
        'w-88 flex h-fit items-center gap-2 rounded-md border-[1px] border-green-300 bg-white-100 p-4',
        className,
      )}
    >
      <Icon name='normal' />
      <span className='font-medium'>{message}</span>
    </div>
  );
};

export default InfoCard;
