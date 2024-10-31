import AutoPlanCreate from '@/components/feature/AutoPlanCreate';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.AUTOPLAN.CREATE;

export const metadata = {
  title,
  description,
};

const page = () => {
  return <AutoPlanCreate />;
};

export default page;
