'use client';

import { Suspense } from 'react';
import Login from '@/components/feature/Login';

const page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Login />
    </Suspense>
  );
};

export default page;
