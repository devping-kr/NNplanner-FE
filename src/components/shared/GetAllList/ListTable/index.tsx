import Table, { TableRowData } from '@/components/common/Table';

interface Props {
  data: TableRowData[];
  onRowClick?: (id: number | string) => void;
  headerType?: 'viewPlan' | 'viewChart';
  miniList?: boolean;
}

const GetAllListTable = ({ headerType, data, onRowClick, miniList }: Props) => {
  return (
    <Table
      data={data}
      type='list'
      onRowClick={onRowClick}
      headerType={headerType!}
      miniList={miniList}
    />
  );
};

export default GetAllListTable;
