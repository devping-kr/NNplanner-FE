import Badge from '@/components/common/Badge';
import Icon from '@/components/common/Icon';
import { Subtitle2Black, TableBodyTypo } from '@/components/common/Typography';

const NavProfile = ({ name = '냠냠' }: { name: string }) => {
  return (
    <button className='flex w-full items-center justify-between gap-2'>
      <Badge
        imageSrc='/imgs/pi-gon-ping.jpg'
        size={40}
        className='border border-grey-100'
      />
      <div className='flex items-center justify-center gap-2'>
        <TableBodyTypo>다시 만나 기뻐요!</TableBodyTypo>
        <Subtitle2Black>{name}님</Subtitle2Black>
      </div>
      <Icon name='arrowNext' color='black' />
    </button>
  );
};

export default NavProfile;
