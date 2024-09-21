import { cn } from '@/utils/core';
import { TableRowData, TableType } from '@/components/common/Table';

type TableBodyProps = {
  headerData: string[];
  bodyData: TableRowData[];
  type: TableType;
  className?: string;
};

const TableBody = ({
  headerData,
  bodyData,
  type,
  className,
}: TableBodyProps) => {
  const handleTrClick = () => {};

  return (
    <tbody>
      {bodyData.map((item, index) => (
        <tr
          key={index}
          className='border-thead border-y'
          onClick={type === 'list' ? handleTrClick : undefined}
        >
          {headerData.map((header) => (
            <td key={header} className={cn('bg-white-100 p-3', className)}>
              {item[header] !== undefined ? item[header] : '-'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
