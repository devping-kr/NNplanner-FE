import { cn } from '@/utils/core';
import { Label1Black } from '@/components/common/Typography';

type TableHeaderProps = {
  headerData: string[];
  className?: string;
  headerType?: 'viewPlan' | 'viewChart';
  miniList?: boolean;
};

const TableHeader = ({
  headerData,
  className,
  headerType,
  miniList,
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

  const miniPlanHeaderStyles: Record<string, string> = {
    '식단 ID': 'w-[70px]',
    '식단 이름': 'w-[210px]',
    대분류: 'w-[80px]',
    소분류: 'w-[140px]',
    생성일: 'w-[106px]',
  };

  return (
    <thead className={miniList ? 'h-[50px]' : 'h-12'}>
      <tr className='border-y border-grey-100'>
        {headerData.map((header, idx) => (
          <th
            key={header}
            className={cn(
              'box-border px-3 text-start',
              idx === 0 ? 'pl-4' : idx === headerData.length - 1 ? 'pr-4' : '',
              className,
              (headerType === 'viewPlan' && planHeaderStyles[header]) || '',
              (headerType === 'viewPlan' &&
                miniList &&
                miniPlanHeaderStyles[header]) ||
                '',
              (headerType === 'viewChart' && surveyHeaderStyles[header]) || '',
            )}
          >
            <Label1Black>{header}</Label1Black>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
