import Icon from '@/components/common/Icon';
import NavMenu from '@/components/common/NavMenu';
import {
  Body2Grey500,
  Label1White,
  Subtitle2Green500,
} from '@/components/common/Typography';
import { NAV_LINKS } from '@/constants/_navbar';

const ICON_SIZE = 24;

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
        <NavMenu
          key={name}
          href={href}
          isActive={selectedTab === name}
          className='group'
        >
          <Icon
            name={icon}
            className='group-hover:stroke-white-100'
            color={selectedTab === name ? 'green500' : 'grey500'}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
          {selectedTab === name ? (
            <Subtitle2Green500 className='group-hover:font-medium group-hover:leading-[1.52] group-hover:text-white-100'>
              {name}
            </Subtitle2Green500>
          ) : (
            <Body2Grey500 className='group-hover:text-white-100'>
              {name}
            </Body2Grey500>
          )}
        </NavMenu>
      ))}
    </div>
  </>
);

export default NavbarSection;
