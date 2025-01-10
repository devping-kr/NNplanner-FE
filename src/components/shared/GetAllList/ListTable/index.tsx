import Table, { TableRowData } from '@/components/common/Table';

interface Props {
  data: TableRowData[];
  onRowClick?: (id: number | string) => void;
  headerType?: 'viewPlan' | 'viewChart';
}

const GetAllListTable = ({ headerType, data, onRowClick }: Props) => {
  return (
    <Table
      data={data}
      type='list'
      onRowClick={onRowClick}
      headerType={headerType!}
    />
  );
};

export default GetAllListTable;
