import Badge from '@/components/common/Badge';
import Icon from '@/components/common/Icon';

const NavProfile = ({ name = '냠냠' }: { name: string }) => {
  return (
    <button className='flex h-[90px] w-full items-center justify-between px-10 py-6'>
      <Badge imageSrc='/imgs/pi-gon-ping.jpg' />
      <div className='flex flex-col gap-[2px]'>
        <span className='text-nowrap text-xs text-gray-600'>
          다시 만나 기뻐요🐭
        </span>
        <span className='text-sm text-dark-100'>{name}</span>
      </div>
      <Icon name='arrowNext' color='black' className='hover:stroke-dark-200' />
    </button>
  );
};

export default NavProfile;
