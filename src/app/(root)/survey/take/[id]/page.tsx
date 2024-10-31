import SurveyTake from '@/components/feature/Survey/Take';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.SURVEY.TAKE;

export const metadata = {
  title,
  description,
};

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  return <SurveyTake id={id} />;
};

export default page;
