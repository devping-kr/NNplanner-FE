'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { H4Black, H5Black } from '@/components/common/Typography';
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
        <H4Black>{isMounted ? username : ''}님, 어서오세요!</H4Black>
        <H4Black>오늘도 냠냠플래너에서 건강한 식단을 관리해볼까요?</H4Black>
      </div>
      <div className='rounded-lg bg-white-100 px-4 py-3'>
        <H5Black>{date.format('YYYY년 MM월 DD일')}</H5Black>
      </div>
    </div>
  );
};

export default MainPageHeader;
