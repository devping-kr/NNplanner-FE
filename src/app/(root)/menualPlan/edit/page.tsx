import MenualPlanEdit from '@/components/feature/MenualPlanEdit';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.MENUALPLAN.EDIT;

export const metadata = {
  title,
  description,
};

const page = () => {
  return <MenualPlanEdit />;
};

export default page;
