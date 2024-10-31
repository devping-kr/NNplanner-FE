import SurveyEdit from '@/components/feature/Survey/Edit';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.SURVEY.EDIT;

export const metadata = {
  title,
  description,
};

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;

  return <SurveyEdit id={id} />;
};

export default page;
