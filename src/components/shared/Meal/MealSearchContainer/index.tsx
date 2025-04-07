import Image from 'next/image';
import { forwardRef } from 'react';
import { FoodInfo } from '@/type/menu/menuResponse';
import { Body2Assistive, Body3Assistive } from '@/components/common/Typography';
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
          className='max-h-[584px] w-full overflow-y-auto rounded-lg bg-grey-50 p-2'
          ref={ref}
          onScroll={onScroll}
        >
          {searchResultList.length === 0 ? (
            <div className='m-auto flex h-20 w-full items-center justify-center rounded-lg bg-grey-50'>
              <Body2Assistive>
                {isError ? '메뉴 검색에 실패했습니다' : '메뉴를 검색해주세요'}
              </Body2Assistive>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              <MealTable
                data={searchResultList}
                isButton
                contentClassName='p-2 hover:bg-grey-100 rounded'
                theadColor='white'
                onClick={onClickNewMenu}
              />
              {isLoading && (
                <div className='flex w-full flex-col items-center justify-center gap-2'>
                  <Image
                    src='/imgs/loading-animation.gif'
                    alt='로딩 애니메이션'
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <Body3Assistive>메뉴 로딩 중...</Body3Assistive>
                </div>
              )}
              {!isLoading && !hasMore && (
                <div className='flex items-center justify-center pb-8 pt-4'>
                  <Body2Assistive>검색 결과가 없습니다.</Body2Assistive>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

MealSearchContainer.displayName = 'MealSearchContainer';

export default MealSearchContainer;
