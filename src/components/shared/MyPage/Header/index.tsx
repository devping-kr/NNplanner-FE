import { PageHeaderTitle } from '@/components/common/Typography';

interface Props {
  title: string;
}

const MyPageHeader = ({ title }: Props) => {
  return <PageHeaderTitle>{title}</PageHeaderTitle>;
};

export default MyPageHeader;
