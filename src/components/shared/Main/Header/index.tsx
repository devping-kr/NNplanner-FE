import dayjs from 'dayjs';
import { HeadPrimary } from '@/components/common/Typography';

const USER_DATA = {
  username: '유저이름',
};

const today = new Date();
const date = dayjs(today, 'YYYY-MM-DD');

const MainPageHeader = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex flex-col gap-1'>
        <HeadPrimary>{USER_DATA.username}님, 어서오세요!</HeadPrimary>
        <HeadPrimary>
          오늘도 냠냠플래너에서 건강한 식단을 관리해볼까요?
        </HeadPrimary>
      </div>
      <HeadPrimary>{date.format('YYYY년MM월DD일')}</HeadPrimary>
    </div>
  );
};

export default MainPageHeader;
