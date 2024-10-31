import MainHome from '@/components/feature/MainHome';
import { PAGE_METADATA } from '@/constants/_metadata';

const { title, description } = PAGE_METADATA.MAIN;

export const metadata = {
  title,
  description,
};

const page = () => {
  return <MainHome />;
};

export default page;
