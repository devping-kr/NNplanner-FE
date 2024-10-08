'use client';

import { PageHeaderTitle } from '@/components/common/Typography';

interface Props {
  title: string;
}

const ViewPlanHeader = ({ title }: Props) => {
  return <PageHeaderTitle>{title}</PageHeaderTitle>;
};

export default ViewPlanHeader;
