import { ChangeEvent } from 'react';
import { Input } from '@/components/common/Input';
import { NutritionMenu } from '@/components/common/Typography';
import MealTable from '@/components/shared/Meal/MealTable';
import { NutritionData } from '@/components/shared/Meal/NutritionInfo';

type MealSearchContainerProps = {
  keyword: string;
  searchResultList: NutritionData[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClickNewMenu: (menu: string) => void;
};

const MealSearchContainer = ({
  keyword,
  searchResultList,
  onChange,
  onSubmit,
  onClickNewMenu,
}: MealSearchContainerProps) => {
  return (
    <div className='flex w-full flex-col gap-2'>
      <Input
        className='text-md placeholder:text-md font-semibold'
        placeholder='메뉴 이름을 입력해주세요'
        bgcolor='search'
        includeButton
        onChange={(e) => onChange(e)}
        onSubmit={onSubmit}
        value={keyword || ''}
      />
      <div className='custom-scrollbar max-h-[470px] w-full overflow-y-auto rounded-md bg-white-200 p-2'>
        {searchResultList.length === 0 ? (
          <NutritionMenu>메뉴가 존재하지 않습니다</NutritionMenu>
        ) : (
          <MealTable
            data={searchResultList}
            isButton
            onClick={onClickNewMenu}
          />
        )}
      </div>
    </div>
  );
};

export default MealSearchContainer;
