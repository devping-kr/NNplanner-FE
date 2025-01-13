import Badge from '@/components/common/Badge';
import Icon from '@/components/common/Icon';
import { Body2Black, Subtitle2Black } from '@/components/common/Typography';

const NavProfile = ({ name = '냠냠' }: { name: string }) => {
  return (
    <button className='flex w-[238px] items-center justify-between gap-2'>
      <Badge
        // TODO: 추후 이미지 변경 필요
        imageSrc='/imgs/pi-gon-ping.jpg'
        size={40}
        className='border border-grey-100'
      />
      <div className='flex items-center justify-center gap-2'>
        <Body2Black>다시 만나 기뻐요!</Body2Black>
        <Subtitle2Black>{name}님</Subtitle2Black>
      </div>
      <Icon name='arrowNext' color='black' />
    </button>
  );
};

export default NavProfile;
