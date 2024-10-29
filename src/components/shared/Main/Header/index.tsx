'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { HeadPrimary } from '@/components/common/Typography';
import { useUserStore } from '@/stores/useUserStore';

const today = new Date();
const date = dayjs(today, 'YYYY-MM-DD');

const MainPageHeader = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const username = useUserStore((state) => state.username);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        <HeadPrimary>{isMounted ? username : ''}님, 어서오세요!</HeadPrimary>
        <HeadPrimary>
          오늘도 냠냠플래너에서 건강한 식단을 관리해볼까요?
        </HeadPrimary>
      </div>
      <div className='rounded border border-gray-300 bg-white-100 px-5 py-2'>
        <HeadPrimary>{date.format('YYYY년 MM월 DD일')}</HeadPrimary>
      </div>
    </div>
  );
};

export default MainPageHeader;
