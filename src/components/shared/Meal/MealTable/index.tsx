import { FoodInfo } from '@/type/menu/menuResponse';
import { cn } from '@/utils/core';
import { removeTrailingZeros } from '@/utils/meal';
import { Label1Black, Label2Black } from '@/components/common/Typography';

type DynamicTableProps = {
  tableData: Record<string, string | number>[];
  theadColor?: 'grey' | 'white';
};

const DynamicTable = ({
  tableData,
  theadColor = 'grey',
}: DynamicTableProps) => {
  const columns = Object.keys(tableData[0]);

  return (
    <div className='overflow-hidden rounded-lg border border-grey-100'>
      <table className='w-full table-fixed text-center'>
        <thead
          className={cn(
            'border-b border-grey-100',
            theadColor === 'grey' && 'bg-grey-50',
            theadColor === 'white' && 'bg-white-100',
          )}
        >
          <tr>
            {columns.map((col) => (
              <th key={col} className='py-1'>
                <Label2Black>{col}</Label2Black>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                theadColor === 'grey' && 'bg-white-100',
                theadColor === 'white' && 'bg-grey-50',
              )}
            >
              {columns.map((col) => (
                <td key={col} className='py-1'>
                  <Label2Black>{row[col]}</Label2Black>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type MealTableProps = {
  data: FoodInfo[];
  isButton?: boolean;
  contentClassName?: string;
  theadColor?: 'grey' | 'white';
  onClick?: (menu: string) => void;
};

const MealTable = ({
  data,
  isButton = false,
  contentClassName,
  theadColor = 'grey',
  onClick,
}: MealTableProps) => {
  return (
    <div className='flex w-full flex-col gap-4'>
      {data?.map((item, index) => {
        const tableData = [
          {
            에너지: removeTrailingZeros(item.kcal),
            탄수화물: removeTrailingZeros(item.carbohydrate),
            단백질: removeTrailingZeros(item.protein),
            지방: removeTrailingZeros(item.fat),
          },
        ];

        const content = (
          <div className={cn('flex flex-col gap-2', contentClassName)}>
            <Label1Black>{item.foodName}</Label1Black>
            <DynamicTable tableData={tableData} theadColor={theadColor} />
          </div>
        );

        return isButton ? (
          <button
            type='button'
            key={`${item.foodId}-${index}`}
            className='flex w-full flex-col rounded-lg text-left transition duration-300 ease-in-out hover:bg-grey-100 active:bg-grey-200'
            onClick={() => onClick?.(item.foodName)}
          >
            {content}
          </button>
        ) : (
          <div
            key={`${item.foodId}-${index}`}
            className='flex w-full flex-col rounded-lg text-left'
            onClick={() => onClick?.(item.foodName)}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default MealTable;
