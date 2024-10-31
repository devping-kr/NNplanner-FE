import MealPlanEdit from '@/components/feature/MealPlanEdit';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.VIEWPLAN.EDIT;

export const metadata = {
  title,
  description,
};

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <MealPlanEdit id={id} />;
};

export default page;
