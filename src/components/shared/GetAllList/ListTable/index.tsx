import Table, { TableRowData } from '@/components/common/Table';

interface Props {
  data: TableRowData[];
}

const GetAllListTable = ({ data }: Props) => {
  return <Table data={data} type='list' />;
};

export default GetAllListTable;
