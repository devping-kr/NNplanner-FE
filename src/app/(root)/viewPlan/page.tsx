import { Suspense } from 'react';
import ViewPlan from '@/components/feature/ViewPlan';

const page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ViewPlan />
    </Suspense>
  );
};

export default page;
