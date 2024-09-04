'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Divider from '@/components/common/Divider';
import Icon from '@/components/common/Icon';
import NavMenu from '@/components/common/NavMenu';
import NavProfile from '@/components/common/NavProfile';

const Navbar = () => {
  const pathname = usePathname();

  const isDashboardActive = pathname === '/dashboard';
  const isAutoPlanActive = pathname === '/autoPlan ';
  const isManualPlanActive = pathname === '/manualPlan ';
  const isViewPlanActive = pathname === '/viewPlan';
  const isResearchViewActive = pathname === '/researchView';

  return (
    <nav className='fixed left-0 top-0 z-50 flex h-screen w-60 flex-col place-content-between bg-white-100'>
      <div className='flex flex-col gap-9 p-6'>
        <Link href='#' className='w-fit self-center'>
          <Image
            src='/imgs/navbar-logo.png'
            width={180}
            height={42}
            alt='logo'
          />
        </Link>
        <div className='flex h-full flex-col'>
          <div className='flex flex-col gap-2'>
            <NavMenu href='#' isActive={isDashboardActive}>
              <Icon name='dashboard' className='hover:stroke-green-800' />홈
              대시보드
            </NavMenu>
            <NavMenu href='#' isActive={isAutoPlanActive}>
              <Icon name='auto' className='hover:stroke-green-800' />
              자동 식단 작성
            </NavMenu>
            <NavMenu href='#' isActive={isManualPlanActive}>
              <Icon name='calendar' className='hover:stroke-green-800' />
              수동 식단 작성
            </NavMenu>
            <NavMenu href='#' isActive={isViewPlanActive}>
              <Icon name='search' className='hover:stroke-green-800' />
              식단 조회
            </NavMenu>
            <NavMenu href='#' isActive={isResearchViewActive}>
              <Icon name='chart' className='hover:stroke-green-800' />
              설문 결과 조회
            </NavMenu>
          </div>
        </div>
      </div>
      <div>
        <Divider />
        <button className='flex h-[90px] w-full items-center gap-3 px-10 py-6 text-sm'>
          <Icon name='logout' className='fill-gray-600 hover:fill-green-800' />
          <span>로그아웃</span>
        </button>
        <Divider />
        <NavProfile name={'유저 이름'} />
      </div>
    </nav>
  );
};

export default Navbar;
