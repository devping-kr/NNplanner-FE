import Table, { TableRowData } from '@/components/common/Table';

interface Props {
  data: TableRowData[];
  onRowClick?: (id: number | string) => void;
}

const GetAllListTable = ({ data, onRowClick }: Props) => {
  return <Table data={data} type='list' onRowClick={onRowClick} />;
};

export default GetAllListTable;
