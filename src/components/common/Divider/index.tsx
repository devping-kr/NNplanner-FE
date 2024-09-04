import { cn } from '@/utils/core';

type DividerProps = {
  className?: string;
};

const Divider = ({ className }: DividerProps) => {
  return <hr className={cn('h-[1px] border-gray-300', className)} />;
};

export default Divider;
