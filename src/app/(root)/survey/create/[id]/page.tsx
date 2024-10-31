import SurveyCreate from '@/components/feature/Survey/Create';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.SURVEY.CREATE;

export const metadata = {
  title,
  description,
};

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <SurveyCreate id={id} />;
};

export default page;
