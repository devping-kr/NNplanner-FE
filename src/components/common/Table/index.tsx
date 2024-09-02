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
};

const Table = ({ data, type = 'table' }: TableProps) => {
  const tableHeaders = Array.from(
    new Set(data.flatMap((item) => Object.keys(item))),
  );

  return (
    <div className='overflow-hidden rounded-md'>
      <table className='w-full border-collapse text-center'>
        <TableHeader headerData={tableHeaders} />
        <TableBody headerData={tableHeaders} bodyData={data} type={type} />
      </table>
    </div>
  );
};
export default Table;
