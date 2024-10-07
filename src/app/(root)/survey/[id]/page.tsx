import SurveyTake from '@/components/feature/Survey/Take';

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  return <SurveyTake id={id} />;
};

export default page;
