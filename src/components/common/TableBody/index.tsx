import { cn } from '@/utils/core';
import { TableBodyTypo } from '../Typography';
import { TableRowData, TableType } from '@/components/common/Table';

type TableBodyProps = {
  headerData: string[];
  bodyData: TableRowData[];
  type: TableType;
  className?: string;
  onRowClick?: (id: number | string) => void;
  headerType?: 'viewPlan' | 'viewChart';
};

const TableBody = ({
  headerData,
  bodyData,
  type,
  className,
  onRowClick,
  headerType,
}: TableBodyProps) => {
  const planHeaderStyles: Record<string, string> = {
    '식단 ID': 'w-[108px]',
    '식단 이름': 'w-[924px]',
    대분류: 'w-[128px]',
    소분류: 'w-[264px]',
    생성일: 'w-[124px]',
  };

  const surveyHeaderStyles: Record<string, string> = {
    '설문 ID': 'w-[108px]',
    '설문 이름': 'w-[948px]',
    생성일: 'w-[184px]',
    마감일: 'w-[184px]',
    상태: 'w-[124px]',
  };

  return (
    <tbody className='border-b border-grey-100 bg-white-100'>
      {bodyData.map((item, rowIndex) => (
        <tr
          key={rowIndex}
          className={cn('mx-3 h-16 cursor-pointer odd:bg-grey-50')}
          onClick={
            onRowClick && type === 'list' && typeof item.설문ID === 'number'
              ? () => onRowClick(item.설문ID as number)
              : onRowClick && type === 'list' && typeof item.식단ID === 'string'
                ? () => onRowClick(item.식단ID as string)
                : undefined
          }
        >
          {headerData.map((header, idx) => {
            const cellClass = cn(
              'px-3',
              idx === 0 ? 'pl-4' : idx === headerData.length - 1 ? 'pr-4' : '',
              className,
              (headerType === 'viewPlan' && planHeaderStyles[header]) || '',
              (headerType === 'viewChart' && surveyHeaderStyles[header]) || '',
            );
            return (
              <td key={header} className={cellClass}>
                <TableBodyTypo>
                  {item[header] !== undefined ? item[header] : '-'}
                </TableBodyTypo>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
