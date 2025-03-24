import { Link } from 'react-scroll';
import { Body2Grey900 } from '@/components/common/Typography';

interface Props {
  menu: {
    name: string;
    id: number;
  };
}

const HeaderMenuItem = ({ menu }: Props) => {
  return (
    <Link
      to={`section${menu.id}`}
      smooth={true}
      duration={500}
      className='cursor-pointer'
    >
      <Body2Grey900>{menu.name}</Body2Grey900>
    </Link>
  );
};

export default HeaderMenuItem;
