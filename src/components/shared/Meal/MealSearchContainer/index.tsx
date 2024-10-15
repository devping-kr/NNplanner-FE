import { ChangeEvent, forwardRef } from 'react';
import { FoodInfo } from '@/type/menu/menuResponse';
import { Input } from '@/components/common/Input';
import { NutritionMenu } from '@/components/common/Typography';
import MealTable from '@/components/shared/Meal/MealTable';

type MealSearchContainerProps = {
  keyword: string;
  searchResultList: FoodInfo[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClickNewMenu: (menu: string) => void;
  isError?: boolean;
  isLoading: boolean;
  hasMore: boolean;
  onScroll: () => void;
};

const MealSearchContainer = forwardRef<
  HTMLDivElement,
  MealSearchContainerProps
>(
  (
    {
      keyword,
      searchResultList,
      onChange,
      onSubmit,
      onClickNewMenu,
      isError,
      isLoading,
      hasMore,
      onScroll,
    },
    ref,
  ) => {
    return (
      <div className='flex w-full flex-col gap-2'>
        <Input
          className='text-md placeholder:text-md font-semibold'
          placeholder='메뉴 이름을 입력해주세요'
          bgcolor='meal'
          includeButton
          onChange={(e) => onChange(e)}
          onSubmit={onSubmit}
          value={keyword || ''}
        />
        <div
          className='scrollbar-gray-100 max-h-[380px] w-full overflow-y-auto rounded-md bg-white-200 p-2'
          ref={ref}
          onScroll={onScroll}
        >
          {searchResultList.length === 0 ? (
            <NutritionMenu>
              {isError ? '메뉴 검색에 실패했습니다' : '메뉴를 검색해주세요'}
            </NutritionMenu>
          ) : (
            <>
              <MealTable
                data={searchResultList}
                isButton
                onClick={onClickNewMenu}
              />
              {isLoading && <NutritionMenu>로딩 중...</NutritionMenu>}
              {!isLoading && !hasMore && (
                <NutritionMenu>더 이상 결과가 없습니다.</NutritionMenu>
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);

MealSearchContainer.displayName = 'MealSearchContainer';

export default MealSearchContainer;
