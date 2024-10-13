import { Suspense } from 'react';
import ViewChart from '@/components/feature/ViewChart';

const page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ViewChart />
    </Suspense>
  );
};

export default page;
