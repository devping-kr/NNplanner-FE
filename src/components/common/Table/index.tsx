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
};

const Table = ({
  data,
  type = 'table',
  headerClassName,
  bodyClassName,
  onRowClick,
}: TableProps) => {
  const tableHeaders = Array.from(
    new Set(data.flatMap((item) => Object.keys(item))),
  );

  return (
    <div className='w-full'>
      <table className='w-full border-separate border-spacing-0 overflow-hidden rounded-lg text-center'>
        <TableHeader headerData={tableHeaders} className={headerClassName} />
        <TableBody
          headerData={tableHeaders}
          bodyData={data}
          type={type}
          className={bodyClassName}
          onRowClick={onRowClick}
        />
      </table>
    </div>
  );
};
export default Table;
