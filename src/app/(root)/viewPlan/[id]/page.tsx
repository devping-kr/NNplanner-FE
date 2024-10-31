// import { Metadata, ResolvingMetadata } from 'next';
import MealPlan from '@/components/feature/MealPlan';

import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.VIEWPLAN.DETAIL;

export const metadata = {
  title,
  description,
};

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <MealPlan id={id} />;
};

export default page;
