'use client';

import Image from 'next/image';
import { Link } from 'react-scroll';
import Button from '@/components/common/Button/Button';
import HeaderMenuItem from '@/components/feature/Landing/_components/HeaderMenuItem';
import { LANDING_HEADER_MENUS } from '@/constants/_landingHeader';
import useNavigate from '@/hooks/useNavigate';

const LandingHeader = () => {
  const { navigate } = useNavigate();

  return (
    <header className='sticky top-0 z-50 flex h-24 w-full items-center justify-between bg-white-100 px-8'>
      <Link
        to='section0'
        smooth
        duration={800}
        className='cursor-pointer'
        spy
        offset={-100}
      >
        <Image
          src='/imgs/header-logo.png'
          width={66}
          height={48}
          alt='header-logo'
        />
      </Link>
      <div className='flex w-[528px] items-center justify-between'>
        {LANDING_HEADER_MENUS.map((menu) => (
          <HeaderMenuItem menu={menu} key={menu.id} />
        ))}
      </div>
      <Button
        variant='landingOutline'
        size='sm'
        width='fit'
        className='rounded-full transition-none'
        onClick={() => navigate('/login')}
      >
        <span className='text-base font-bold leading-[1.44] tracking-[-0.008em]'>
          지금 무료로 시작하기
        </span>
      </Button>
    </header>
  );
};

export default LandingHeader;
