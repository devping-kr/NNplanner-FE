import ViewChart from '@/components/feature/ViewChart';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.VIEWCHART;

export const metadata = {
  title,
  description,
};

const page = () => {
  return (
    // 추후 스켈레톤ui로 수정
    // <Suspense fallback={<div>loading...</div>}>
    <ViewChart />
    // </Suspense>
  );
};

export default page;
