'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/utils/core';

type Props<T> = {
  type?: string;
  controlTabItems: readonly T[];
  selectedFilter: string;
  setSelectedFilter: Dispatch<SetStateAction<string>>;
  selectedTab: T;
  setSelectedTab: Dispatch<SetStateAction<T>>;
};

const ControlTab = <T extends string>({
  type,
  controlTabItems,
  selectedFilter,
  setSelectedFilter,
  selectedTab,
  setSelectedTab,
}: Props<T>) => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as string;
  const currentTab = tabParam ?? ('전체' as string);

  return (
    <div className='flex gap-2'>
      {controlTabItems.map((tab) => (
        <Link
          href={
            type === 'sort'
              ? `${selectedFilter === undefined ? `?sort=${tab}` : `?tab=${selectedFilter}&sort=${tab}`}`
              : `?tab=${tab}&sort=${selectedTab}`
          }
          key={tab}
          className={cn(
            'text-xs text-gray-400',
            (tab === currentTab || tab === selectedTab) &&
              'font-semibold text-green-600',
          )}
          replace
          onClick={() => {
            if (type === 'sort') {
              setSelectedTab(tab);
            } else {
              setSelectedFilter(tab);
            }
          }}
        >
          {tab}
        </Link>
      ))}
    </div>
  );
};

export default ControlTab;
