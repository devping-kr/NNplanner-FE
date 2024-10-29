import { cn } from '@/utils/core';

type EmptyProps = {
  className?: string;
  text?: string;
};

const Empty = ({ className, text = '데이터가 없습니다.' }: EmptyProps) => {
  return (
    <div className={cn('border-dotted border-gray-500', className)}>
      <span>{text}</span>
    </div>
  );
};

export default Empty;
