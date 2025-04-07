import { cn } from '@/utils/core';
import { TableRowData, TableType } from '@/components/common/Table';
import { Body2Black } from '@/components/common/Typography';

type TableBodyProps = {
  headerData: string[];
  bodyData: TableRowData[];
  type: TableType;
  className?: string;
  onRowClick?: (id: number | string) => void;
  headerType?: 'viewPlan' | 'viewChart';
  miniList?: boolean;
};

const TableBody = ({
  headerData,
  bodyData,
  type,
  className,
  onRowClick,
  headerType,
  miniList,
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

  const miniPlanHeaderStyles: Record<string, string> = {
    '식단 ID': 'w-[80px]',
    '식단 이름': 'w-[210px]',
    대분류: 'w-[80px]',
    소분류: 'w-[140px]',
    생성일: 'w-[96px]',
  };

  return (
    <tbody className='border-b border-grey-100 bg-white-100'>
      {bodyData.map((item, rowIndex) => (
        <tr
          key={rowIndex}
          className={cn(
            'h-16 cursor-pointer odd:bg-grey-50 hover:bg-grey-100',
            miniList ? 'h-14' : '',
          )}
          onClick={
            onRowClick && type === 'list' && typeof item['설문 ID'] === 'number'
              ? () => onRowClick(item['설문 ID'] as number)
              : onRowClick &&
                  type === 'list' &&
                  typeof item['식단 ID'] === 'string'
                ? () => onRowClick(item['식단 ID'] as string)
                : undefined
          }
        >
          {headerData.map((header, idx) => {
            const cellClass = cn(
              'px-3',
              idx === 0 ? 'pl-4' : idx === headerData.length - 1 ? 'pr-4' : '',
              className,
              (headerType === 'viewPlan' && planHeaderStyles[header]) || '',
              (headerType === 'viewPlan' &&
                miniList &&
                miniPlanHeaderStyles[header]) ||
                '',
              (headerType === 'viewChart' && surveyHeaderStyles[header]) || '',
            );
            return (
              <td key={header} className={cellClass}>
                <Body2Black>
                  {item[header] !== undefined ? item[header] : '-'}
                </Body2Black>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
