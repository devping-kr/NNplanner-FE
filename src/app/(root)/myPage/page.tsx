import MyPage from '@/components/feature/MyPage';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.MYPAGE;

export const metadata = {
  title,
  description,
};

const page = () => {
  return <MyPage />;
};

export default page;
