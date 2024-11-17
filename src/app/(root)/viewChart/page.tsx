import { Suspense } from 'react';
import ViewChart from '@/components/feature/ViewChart';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.VIEWCHART.LIST;

export const metadata = {
  title,
  description,
};

const page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ViewChart />
    </Suspense>
  );
};

export default page;
