import { forwardRef } from 'react';
import { FoodInfo } from '@/type/menu/menuResponse';
import { Caption1Grey500, NutritionMenu } from '@/components/common/Typography';
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
          className='max-h-[584px] w-full overflow-y-auto rounded bg-grey-50 p-2'
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
                contentClassName='p-2 hover:bg-grey-100 rounded'
                theadColor='white'
                onClick={onClickNewMenu}
              />
              {isLoading && <Caption1Grey500>로딩 중...</Caption1Grey500>}
              {!isLoading && !hasMore && (
                <Caption1Grey500>더 이상 결과가 없습니다.</Caption1Grey500>
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
