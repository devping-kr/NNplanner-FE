import AutoPlan from '@/components/feature/AutoPlan';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.AUTOPLAN.DEFAULT;

export const metadata = {
  title,
  description,
};

const page = () => {
  return <AutoPlan />;
};

export default page;
