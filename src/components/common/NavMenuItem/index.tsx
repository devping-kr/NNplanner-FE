import BetaBadge from '@/components/common/BetaBadge';
import Icon from '@/components/common/Icon';
import NavMenu from '@/components/common/NavMenu';
import {
  Body2Grey500,
  Subtitle2Green500,
} from '@/components/common/Typography';

const ICON_SIZE = 24;

type Props = {
  name: string;
  href: string;
  icon: string;
  isActive: boolean;
  showBetaBadge: boolean;
};

const NavMenuItem = ({ name, href, icon, isActive, showBetaBadge }: Props) => (
  <NavMenu href={href} isActive={isActive} className='group'>
    <Icon
      name={icon}
      className='group-hover:stroke-white-100'
      color={isActive ? 'green500' : 'grey500'}
      width={ICON_SIZE}
      height={ICON_SIZE}
    />
    {isActive ? (
      <Subtitle2Green500 className='group-hover:font-medium group-hover:leading-[1.52] group-hover:text-white-100'>
        {name}
      </Subtitle2Green500>
    ) : (
      <Body2Grey500 className='group-hover:text-white-100'>{name}</Body2Grey500>
    )}
    {showBetaBadge && <BetaBadge isActive={isActive} />}
  </NavMenu>
);

export default NavMenuItem;
