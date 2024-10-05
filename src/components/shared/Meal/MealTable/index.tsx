import Table from '@/components/common/Table';
import { NutritionMenu } from '@/components/common/Typography';
import { NutritionData } from '@/components/shared/Meal/NutritionInfo';

type MealTableProps = {
  data: NutritionData[];
  isButton?: boolean;
  onClick?: (menu: string) => void;
};

const MealTable = ({ data, isButton = false, onClick }: MealTableProps) => {
  return (
    <div className='flex w-full flex-col'>
      {data?.map((item) => {
        const tableData = [
          {
            에너지: item.kcal,
            탄수화물: item.carbs,
            단백질: item.protein,
            지방: item.fat,
          },
        ];

        const content = (
          <>
            <NutritionMenu>{item.content}</NutritionMenu>
            <Table
              data={tableData}
              headerClassName='p-1'
              bodyClassName='p-1 bg-white-200'
            />
          </>
        );

        return isButton ? (
          <button
            type='button'
            key={item.id}
            className='flex w-full flex-col gap-0.5 rounded-md p-2 text-left transition duration-300 ease-in-out hover:bg-gray-100 active:bg-gray-200'
            onClick={() => onClick?.(item.content)}
          >
            {content}
          </button>
        ) : (
          <div
            key={item.id}
            className='flex w-full flex-col gap-0.5 rounded-md p-2 text-left'
            onClick={() => onClick?.(item.content)}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default MealTable;
