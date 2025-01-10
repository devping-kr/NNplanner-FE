import { cn } from '@/utils/core';
import { TableHeaderTypo } from '@/components/common/Typography';

type TableHeaderProps = {
  headerData: string[];
  className?: string;
  headerType?: 'viewPlan' | 'viewChart';
};

const TableHeader = ({
  headerData,
  className,
  headerType,
}: TableHeaderProps) => {
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
    <thead className='h-12'>
      <tr className='border-y border-grey-100'>
        {headerData.map((header, idx) => (
          <th
            key={header}
            className={cn(
              'box-border px-3 text-start',
              idx === 0 ? 'pl-4' : idx === headerData.length - 1 ? 'pr-4' : '',
              className,
              (headerType === 'viewPlan' && planHeaderStyles[header]) || '',
              (headerType === 'viewChart' && surveyHeaderStyles[header]) || '',
            )}
          >
            <TableHeaderTypo>{header}</TableHeaderTypo>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
