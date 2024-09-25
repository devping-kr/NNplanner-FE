import { cn } from '@/utils/core';

type TableHeaderProps = {
  headerData: string[];
  className?: string;
};

const TableHeader = ({ headerData, className }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {headerData.map((header) => (
          <th
            key={header}
            className={cn(
              'border-thead border-[1px] border-green-400 bg-green-100 p-3 font-semibold',
              className,
            )}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
