'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import HeaderMenuItem from '@/components/feature/Landing/_components/HeaderMenuItem';
import { LandingHeaderMenus } from '@/constants/_landingHeader';

const LandingHeader = () => {
  const router = useRouter();

  return (
    <header className='sticky top-0 z-50 flex h-24 w-full items-center justify-between bg-white-100 px-8'>
      <Image
        src='/imgs/header-logo.png'
        width={66}
        height={48}
        alt='header-logo'
        onClick={() => router.push('/')}
        className='hover:cursor-pointer'
      />
      <div className='flex w-[528px] items-center justify-between'>
        {LandingHeaderMenus.map((menu) => (
          <HeaderMenuItem menu={menu} key={menu.id} />
        ))}
      </div>
      <Button
        variant='landingOutline'
        size='sm'
        width='fit'
        className='rounded-full'
      >
        <span className='text-base font-bold leading-[1.44] tracking-[-0.008em]'>
          지금 무료로 시작하기
        </span>
      </Button>
    </header>
  );
};

export default LandingHeader;
