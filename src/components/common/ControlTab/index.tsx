import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/utils/core';

type Props<T> = {
  controlTabItems: readonly T[];
  selectedTab: T;
  setSelectedTab: Dispatch<SetStateAction<T>>;
};

const ControlTab = <T extends string>({
  controlTabItems,
  selectedTab,
  setSelectedTab,
}: Props<T>) => {
  return (
    <div className='flex gap-2'>
      {controlTabItems.map((tab) => (
        <button
          key={tab}
          className={cn(
            'text-xs text-gray-400',
            tab === selectedTab && 'font-semibold text-green-600',
          )}
          onClick={() => setSelectedTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ControlTab;
