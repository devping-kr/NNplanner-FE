import AutoPlanEdit from '@/components/feature/AutoPlanEdit';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.AUTOPLAN.EDIT;

export const metadata = {
  title,
  description,
};

const page = () => {
  return <AutoPlanEdit />;
};

export default page;
