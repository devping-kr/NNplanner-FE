'use client';

import { usePathname } from 'next/navigation';
import Icon from '@/components/common/Icon';
import NavMenu from '@/components/common/NavMenu';
import { NavbarTypo } from '@/components/common/Typography';
import { NAV_LINKS } from '@/constants/_navbar';

const Navbar = () => {
  const pathname = usePathname();
  const defaultTab = NAV_LINKS[0].name;
  const selectedTab =
    NAV_LINKS.find((nav) => nav.href !== '/' && pathname.startsWith(nav.href))
      ?.name ?? defaultTab;
  const isSurveyPage = /^\/survey\/\d+$/.test(pathname);
  const mealLinks = NAV_LINKS.slice(0, 4);
  const surveyLinks = NAV_LINKS.slice(4);

  return (
    !isSurveyPage && (
      <nav className='sticky top-0 flex h-screen w-[260px] min-w-[260px] flex-col bg-grey-800 pt-[88px]'>
        <NavbarTypo className='px-6 pb-4 pt-6'>식단</NavbarTypo>
        <div className='flex flex-col'>
          {mealLinks.map(({ name, href, icon }) => (
            <NavMenu key={name} href={href} isActive={selectedTab === name}>
              <Icon
                name={icon}
                className='hover:stroke-green-500'
                color={selectedTab === name ? 'green500' : 'grey500'}
              />
              <span>{name}</span>
            </NavMenu>
          ))}
        </div>
        <NavbarTypo className='px-6 pb-4 pt-6'>설문</NavbarTypo>
        <div className='flex flex-col'>
          {surveyLinks.map(({ name, href, icon }) => (
            <NavMenu key={name} href={href} isActive={selectedTab === name}>
              <Icon
                name={icon}
                className='hover:stroke-green-500'
                color={selectedTab === name ? 'green500' : 'grey500'}
              />
              <span>{name}</span>
            </NavMenu>
          ))}
        </div>
      </nav>
    )
  );
};

export default Navbar;
