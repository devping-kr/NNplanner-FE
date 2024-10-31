import MenualPlan from '@/components/feature/MenualPlan';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.MENUALPLAN.DEFAULT;

export const metadata = {
  title,
  description,
};

const page = () => {
  return <MenualPlan />;
};

export default page;
