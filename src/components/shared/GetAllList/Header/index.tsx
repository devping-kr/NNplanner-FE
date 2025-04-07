'use client';

import { H2Black } from '@/components/common/Typography';

interface Props {
  title: string;
}

const ViewPlanHeader = ({ title }: Props) => {
  return <H2Black>{title}</H2Black>;
};

export default ViewPlanHeader;
