import { forwardRef } from 'react';
import { FoodInfo } from '@/type/menu/menuResponse';
import { NutritionMenu } from '@/components/common/Typography';
import MealTable from '@/components/shared/Meal/MealTable';

type MealSearchContainerProps = {
  keyword: string;
  searchResultList: FoodInfo[];
  isError?: boolean;
  isLoading: boolean;
  hasMore: boolean;
  onClickNewMenu: (menu: string) => void;
  onScroll: () => void;
};

const MealSearchContainer = forwardRef<
  HTMLDivElement,
  MealSearchContainerProps
>(
  (
    { searchResultList, isError, isLoading, hasMore, onClickNewMenu, onScroll },
    ref,
  ) => {
    return (
      <div className='flex w-full flex-col gap-2'>
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
