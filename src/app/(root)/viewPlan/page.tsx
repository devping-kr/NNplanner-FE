import { Suspense } from 'react';
import ViewPlan from '@/components/feature/ViewPlan';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.VIEWPLAN.LIST;

export const metadata = {
  title,
  description,
};

const page = () => {
  return (
    // 추후 스켈레톤ui로 수정
    <Suspense fallback={<div></div>}>
      <ViewPlan />
    </Suspense>
  );
};

export default page;
