'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/utils/core';
import { Body3Grey500 } from '@/components/common/Typography';

type Props<T> = {
  isSortControl?: boolean;
  controlTabItems: readonly T[];
  selectedFilter?: string;
  setSelectedFilter?: Dispatch<SetStateAction<string>>;
  selectedTab?: T;
  setSelectedTab?: Dispatch<SetStateAction<T>>;
};

const ControlTab = <T extends string>({
  isSortControl,
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
    <div
      className={cn(
        'flex justify-end gap-3',
        !isSortControl ? 'border-r border-grey-100 pr-6' : '',
      )}
    >
      {controlTabItems.map((tab) => (
        <Link
          href={
            isSortControl
              ? `${selectedFilter === undefined ? `?sort=${tab}` : `?tab=${selectedFilter}&sort=${tab}`}`
              : `?tab=${tab}&sort=${selectedTab}`
          }
          key={tab}
          replace
          onClick={() => {
            if (isSortControl) {
              setSelectedTab!(tab);
            } else {
              setSelectedFilter!(tab);
            }
          }}
        >
          <Body3Grey500
            className={
              tab === currentTab || tab === selectedTab ? 'text-green-500' : ''
            }
          >
            {tab}
          </Body3Grey500>
        </Link>
      ))}
    </div>
  );
};

export default ControlTab;
