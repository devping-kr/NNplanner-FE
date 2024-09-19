import ChartDetail from '@/components/feature/ChartDetail';

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return <ChartDetail id={id} />;
};

export default page;
