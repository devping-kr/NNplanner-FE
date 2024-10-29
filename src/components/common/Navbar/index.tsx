'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { destroyTokens } from '@/utils/destroyTokens';
import Divider from '@/components/common/Divider';
import Icon from '@/components/common/Icon';
import NavMenu from '@/components/common/NavMenu';
import NavProfile from '@/components/common/NavProfile';
import { BASE_ROUTES, NAV_LINKS } from '@/constants/_navbar';
import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/stores/useUserStore';

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pathname = usePathname();
  const username = useUserStore((state) => state.username);
  const { logout } = useAuth();

  const defaultTab = NAV_LINKS[0].name;
  const selectedTab =
    NAV_LINKS.find((nav) => nav.href !== '/' && pathname.startsWith(nav.href))
      ?.name ?? defaultTab;

  const handleLogout = () => {
    destroyTokens();
    logout();
  };

  const isSurveyPage = /^\/survey\/\d+$/.test(pathname);

  return (
    !isSurveyPage && (
      <nav className='sticky top-0 flex h-screen w-60 min-w-60 flex-col place-content-between bg-white-100'>
        <div className='flex flex-col gap-9 p-6'>
          <Link href={BASE_ROUTES.MAIN} className='w-fit self-center'>
            <Image
              src='/imgs/navbar-logo.png'
              width={180}
              height={42}
              alt='logo'
            />
          </Link>
          <div className='flex h-full flex-col'>
            <div className='flex flex-col gap-2'>
              {NAV_LINKS.map(({ name, href, icon }) => (
                <NavMenu key={name} href={href} isActive={selectedTab === name}>
                  <Icon
                    name={icon}
                    className='hover:stroke-green-800'
                    color={selectedTab === name ? 'active' : 'normal'}
                  />
                  <span>{name}</span>
                </NavMenu>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Divider />
          <NavProfile name={isMounted ? username : ''} />
          <Divider />
          <button
            className='flex h-[50px] w-full items-center gap-2 px-10 text-sm'
            onClick={handleLogout}
          >
            <Icon
              name='logout'
              className='stroke-gray-600 hover:stroke-green-800'
              width={12}
              height={12}
            />
            <span className='text-gray-600'>로그아웃</span>
          </button>
        </div>
      </nav>
    )
  );
};

export default Navbar;
