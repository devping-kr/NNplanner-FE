'use client';

import Image from 'next/image';
import NavProfile from '@/components/common/NavProfile';
import { useMounted } from '@/hooks/useMounted';
import { useUserStore } from '@/stores/useUserStore';

const Header = () => {
  const isMounted = useMounted();
  const username = useUserStore((state) => state.username);

  return (
    <header className='fixed top-0 z-50 flex w-full flex-row items-center justify-between border border-b-gray-100 bg-white-100 px-6 py-4'>
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
