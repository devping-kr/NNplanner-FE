import ChartDetail from '@/components/feature/ChartDetail';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.VIEWCHART.DETAIL;

export const metadata = {
  title,
  description,
};

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return <ChartDetail id={id} />;
};

export default page;
