'use client';

import { MealHeaderTitle } from '@/components/common/Typography';

interface Props {
  title: string;
}

const ViewPlanHeader = ({ title }: Props) => {
  return (
    <>
      <MealHeaderTitle>{title}</MealHeaderTitle>
    </>
  );
};

export default ViewPlanHeader;
