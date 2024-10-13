import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/utils/core';

type Props<T> = {
  type?: string;
  controlTabItems: readonly T[];
  selectedTab: T;
  setSelectedTab: Dispatch<SetStateAction<T>>;
};

const ControlTab = <T extends string>({
  type,
  controlTabItems,
  selectedTab,
  setSelectedTab,
}: Props<T>) => {
  return (
    <div className='flex gap-2'>
      {controlTabItems.map((tab) => (
        <Link
          href={type === 'sort' ? `?sort=${tab}` : `?tab=${tab}`}
          key={tab}
          className={cn(
            'text-xs text-gray-400',
            tab === selectedTab && 'font-semibold text-green-600',
          )}
          replace
          onClick={() => setSelectedTab(tab)}
        >
          {tab}
        </Link>
      ))}
    </div>
  );
};

export default ControlTab;
