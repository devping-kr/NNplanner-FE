import { cn } from '@/utils/core';
import { TableRowData, TableType } from '@/components/common/Table';

type TableBodyProps = {
  headerData: string[];
  bodyData: TableRowData[];
  type: TableType;
  className?: string;
  onClick?: () => void;
};

const TableBody = ({
  headerData,
  bodyData,
  type,
  className,
  onClick,
}: TableBodyProps) => {
  return (
    <tbody className='bg-white-100'>
      {bodyData.map((item, rowIndex) => (
        <tr
          key={rowIndex}
          className='border-separate border-spacing-0 cursor-pointer'
          onClick={type === 'list' ? onClick : undefined}
        >
          {headerData.map((header, colIndex) => {
            const isFirst = colIndex === 0;
            const isLast = colIndex === headerData.length - 1;
            const isLastRow = rowIndex === bodyData.length - 1;

            const additionalClasses = cn({
              'border-l': isFirst,
              'border-r': isLast,
              'rounded-bl-lg border-l border-b': isFirst && isLastRow,
              'rounded-br-lg border-r border-b': isLast && isLastRow,
            });

            return (
              <td
                key={header}
                className={cn(
                  'border-b border-gray-400 p-3',
                  additionalClasses,
                  className,
                )}
              >
                {item[header] !== undefined ? item[header] : '-'}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
