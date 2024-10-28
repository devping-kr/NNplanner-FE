import MealPlan from '@/components/feature/MealPlan';

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <MealPlan id={id} />;
};

export default page;
