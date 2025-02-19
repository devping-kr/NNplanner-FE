'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FoodInfo } from '@/type/menu/menuResponse';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { Subtitle2Black } from '@/components/common/Typography';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealSearchContainer from '@/components/shared/Meal/MealSearchContainer';
import NutritionMenuButton from '@/components/shared/Meal/NutritionMenuButton';
import { FOOD_SIZE_PER_SCROLL } from '@/constants/_foodPagination';
import { MEAL_CREATE_MESSAGE } from '@/constants/_toastMessage';
import { useGetFoods } from '@/hooks/menu/useGetFoods';
import { useToastStore } from '@/stores/useToastStore';

const MEAL_DEFAULT_PAGE_NUMBER = 1;
const ONE = 1;

type MealEditProps = {
  date: string;
  data: FoodInfo[];
  handleChangeMenu?: (
    date: string,
    menuName: string,
    updatedItem: FoodInfo,
    type: 'edit' | 'add',
  ) => void;
};

const MealEdit = ({ date, data, handleChangeMenu }: MealEditProps) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [searchResultList, setSearchResultList] = useState<FoodInfo[]>([]);
  const [page, setPage] = useState(MEAL_DEFAULT_PAGE_NUMBER);
  const [hasMore, setHasMore] = useState(true);
  const showToast = useToastStore((state) => state.showToast);

  const {
    refetch,
    isLoading,
    isError,
    data: searchFoodData,
  } = useGetFoods(
    {
      foodName: keyword,
      page,
      size: FOOD_SIZE_PER_SCROLL,
    },
    {
      enabled: false, // keyword 변경에 따른 자동 실행을 방지
    },
  );

  // 페이지네이션 상태 리셋 함수
  const resetPagination = () => {
    setPage(MEAL_DEFAULT_PAGE_NUMBER);
    setHasMore(true);
    setSearchResultList([]);
  };

  // 기존 메뉴 클릭 했을 때
  const handleClickMenu = (menu: string) => {
    setKeyword(menu);
    setClickedMenu(menu);
    resetPagination();
  };

  // 검색창에 keyword 입력 후 검색 버튼 눌렀을 때
  const handleSearchClick = () => {
    if (keyword.length < 0) return;
    resetPagination();
    refetch();
  };

  // 검색한 메뉴 목록에서 새로운 메뉴 선택
  const handleClickNewMenu = (menu: string) => {
    const result = searchResultList.find((item) => item.foodName === menu);

    if (result && handleChangeMenu) {
      const isDuplicate = data.some(
        (item) => item.foodName === result.foodName,
      );

      if (isDuplicate) {
        showToast(MEAL_CREATE_MESSAGE.error.duplicate, 'warning');
        return;
      }

      const menuName =
        data.find((item) => item.foodName === clickedMenu)?.foodName || '';
      handleChangeMenu(date, menuName, result, 'edit');

      setClickedMenu(null);
      setKeyword(menu);
      setIsSearchShow(false);
    }
  };

  // 무한 스크롤을 위한 스크롤 이벤트 처리
  const handleSearchContainerScroll = useCallback(() => {
    if (searchContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        searchContainerRef.current;
      if (
        scrollHeight - scrollTop <= clientHeight + ONE &&
        !isLoading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + ONE);
      }
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (!searchFoodData) return;
    if (page === MEAL_DEFAULT_PAGE_NUMBER) {
      setSearchResultList(searchFoodData.data);
    } else {
      setSearchResultList((prevList) => [...prevList, ...searchFoodData.data]);
    }
    setHasMore(searchFoodData.data.length === FOOD_SIZE_PER_SCROLL);
  }, [searchFoodData, page]);

  useEffect(() => {
    const container = searchContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleSearchContainerScroll);

      return () => {
        container.removeEventListener('scroll', handleSearchContainerScroll);
      };
    }
  }, [handleSearchContainerScroll]);

  // 페이지가 바뀔 때마다 데이터를 refetch (새로고침)
  useEffect(() => {
    if (page > MEAL_DEFAULT_PAGE_NUMBER) {
      refetch();
    }
  }, [page, refetch]);

  useEffect(() => {
    setClickedMenu(null);
    setKeyword('');
    setIsSearchShow(false);
  }, [date]);

  if (!data) return null;

  return (
    <MealInfoContainer date={date}>
      <div className='flex w-full flex-col gap-4'>
        {data.map((item) => (
          <NutritionMenuButton
            key={item.foodId}
            menuName={item.foodName}
            onFocus={() => setIsSearchShow(true)}
            onClick={() => handleClickMenu(item.foodName)}
          />
        ))}
      </div>
      <div className='flex h-12 gap-2'>
        <Input
          placeholder='메뉴 이름을 입력해주세요'
          variant='grey50'
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword || ''}
        />
        <Button
          variant='outline'
          onClick={handleSearchClick}
          className='min-w-[68px]'
        >
          <Subtitle2Black>검색</Subtitle2Black>
        </Button>
      </div>
      {isSearchShow && keyword!.length >= 0 && searchResultList.length > 0 && (
        <MealSearchContainer
          ref={searchContainerRef} // ref 추가
          keyword={keyword}
          searchResultList={searchResultList}
          isError={isError}
          isLoading={isLoading}
          hasMore={hasMore}
          onClickNewMenu={handleClickNewMenu}
          onScroll={handleSearchContainerScroll}
        />
      )}
      <KcalInfo data={data} />
    </MealInfoContainer>
  );
};

export default MealEdit;
