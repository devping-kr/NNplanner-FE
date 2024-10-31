import MenualPlanCreate from '@/components/feature/MenualPlanCreate';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.MENUALPLAN.CREATE;

export const metadata = {
  title,
  description,
};

const page = () => {
  return <MenualPlanCreate />;
};

export default page;
