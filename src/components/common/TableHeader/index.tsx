import { cn } from '@/utils/core';

type TableHeaderProps = {
  headerData: string[];
  className?: string;
};

const TableHeader = ({ headerData, className }: TableHeaderProps) => {
  return (
    <thead className='bg-green-100'>
      <tr className='border-separate border-spacing-0'>
        {headerData.map((header, index) => {
          const isFirst = index === 0;
          const isLast = index === headerData.length - 1;

          const additionalClasses = cn({
            'rounded-tl-lg border-l': isFirst,
            'rounded-tr-lg border-r': isLast,
          });

          return (
            <th
              key={header}
              className={cn(
                'border-b border-t border-green-400 p-3 font-semibold',
                additionalClasses,
                className,
              )}
            >
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
