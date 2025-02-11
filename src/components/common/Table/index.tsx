'use client';

import TableBody from '@/components/common/TableBody';
import TableHeader from '@/components/common/TableHeader';

export type TableRowData = {
  [key: string]: string | number | undefined;
};

export type TableType = 'table' | 'list';

type TableProps = {
  data: TableRowData[];
  type?: TableType;
  headerClassName?: string;
  bodyClassName?: string;
  onRowClick?: (id: number | string) => void;
  headerType?: 'viewPlan' | 'viewChart';
  miniList?: boolean;
};

const Table = ({
  data,
  type = 'table',
  headerClassName,
  bodyClassName,
  onRowClick,
  headerType,
  miniList,
}: TableProps) => {
  const tableHeaders = Array.from(
    new Set(data.flatMap((item) => Object.keys(item))),
  );

  return (
    <div className='w-full'>
      <table className='w-full table-fixed'>
        <TableHeader
          headerData={tableHeaders}
          className={headerClassName}
          headerType={headerType!}
          miniList={miniList}
        />
        <TableBody
          headerData={tableHeaders}
          bodyData={data}
          type={type}
          className={bodyClassName}
          onRowClick={onRowClick}
          headerType={headerType!}
          miniList={miniList}
        />
      </table>
    </div>
  );
};
export default Table;
