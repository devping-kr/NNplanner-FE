import { Link } from 'react-scroll';

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
      smooth
      duration={800}
      className='cursor-pointer'
      spy
      offset={-60}
    >
      <span className='text-base font-medium leading-[1.52] tracking-[-0.008em] text-gray-900 transition-none hover:text-green-500'>
        {menu.name}
      </span>
    </Link>
  );
};

export default HeaderMenuItem;
