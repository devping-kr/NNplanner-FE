'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import NavProfile from '@/components/common/NavProfile';
import { useUserStore } from '@/stores/useUserStore';

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const username = useUserStore((state) => state.username);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className='fixed top-0 z-10 flex w-full flex-row items-center justify-between border border-b-gray-100 bg-white-100 px-6 py-4'>
      <Image
        src='/imgs/header-logo.png'
        width={66}
        height={48}
        alt='header logo'
      />
      <NavProfile name={isMounted ? username : ''} />
    </header>
  );
};

export default Header;
