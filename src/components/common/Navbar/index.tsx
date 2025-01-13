'use client';

import { usePathname } from 'next/navigation';
import NavbarSection from '@/components/shared/Nav/NavbarSection';
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
        <NavbarSection
          title='식단'
          links={mealLinks}
          selectedTab={selectedTab}
        />
        <NavbarSection
          title='설문'
          links={surveyLinks}
          selectedTab={selectedTab}
        />
      </nav>
    )
  );
};

export default Navbar;
