import MealPlanEdit from '@/components/feature/MealPlanEdit';

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <MealPlanEdit id={id} />;
};

export default page;
