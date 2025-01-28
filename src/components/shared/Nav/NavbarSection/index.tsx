import NavMenuItem from '@/components/common/NavMenuItem';
import { Label1White } from '@/components/common/Typography';
import { NAV_LINKS } from '@/constants/_navbar';

const BETA_TAB_NAME = NAV_LINKS[1].name;

const isTabActive = (selectedTab: string, tabName: string) =>
  selectedTab === tabName;

type Props = {
  title: string;
  links: typeof NAV_LINKS;
  selectedTab: string;
};

const NavbarSection = ({ title, links, selectedTab }: Props) => (
  <>
    <Label1White className='px-6 pb-4 pt-6'>{title}</Label1White>
    <div className='flex flex-col'>
      {links.map(({ name, href, icon }) => (
        <NavMenuItem
          key={name}
          name={name}
          href={href}
          icon={icon}
          isActive={isTabActive(selectedTab, name)}
          showBetaBadge={name === BETA_TAB_NAME}
        />
      ))}
    </div>
  </>
);

export default NavbarSection;
