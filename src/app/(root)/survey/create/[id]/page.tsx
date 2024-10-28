import SurveyCreate from '@/components/feature/Survey/Create';

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <SurveyCreate id={id} />;
};

export default page;
