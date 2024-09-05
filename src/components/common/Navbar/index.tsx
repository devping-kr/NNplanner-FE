'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Divider from '@/components/common/Divider';
import Icon from '@/components/common/Icon';
import NavMenu from '@/components/common/NavMenu';
import NavProfile from '@/components/common/NavProfile';
import { NAV_LINKS } from '@/constants/_navbar';

const Navbar = () => {
  const pathname = usePathname();

  const defualtTab = NAV_LINKS[0].name;
  const selecedTab =
    NAV_LINKS.find((nav) => nav.href === pathname)?.name ?? defualtTab;

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
            {NAV_LINKS.map(({ name, href, icon }) => (
              <NavMenu key={name} href={href} isActive={selecedTab === name}>
                <Icon name={icon} className='hover:stroke-green-800' />
                <span>{name}</span>
              </NavMenu>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Divider />
        <button className='flex h-[90px] w-full items-center gap-3 px-10 py-6 text-sm'>
          <Icon
            name='logout'
            className='stroke-gray-600 hover:stroke-green-800'
          />
          <span>로그아웃</span>
        </button>
        <Divider />
        <NavProfile name={'유저 이름'} />
      </div>
    </nav>
  );
};

export default Navbar;