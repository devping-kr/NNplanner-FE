import SurveyEdit from '@/components/feature/Survey/Edit';

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  return <SurveyEdit id={id} />;
};

export default page;
