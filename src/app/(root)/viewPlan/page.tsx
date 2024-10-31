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
    <Suspense fallback={<div>loading...</div>}>
      <ViewPlan />
    </Suspense>
  );
};

export default page;
