'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FoodInfo } from '@/type/menu/menuResponse';
import { cn } from '@/utils/core';
import Button from '@/components/common/Button/Button';
import { MAXIUM_MENU_PER_DAY } from '@/components/common/CalendarDay';
import { Input } from '@/components/common/Input';
import { Subtitle2Black, Subtitle2White } from '@/components/common/Typography';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealSearchContainer from '@/components/shared/Meal/MealSearchContainer';
import NutritionMenuButton from '@/components/shared/Meal/NutritionMenuButton';
import { FOOD_SIZE_PER_SCROLL } from '@/constants/_foodPagination';
import { MEAL_CREATE_MESSAGE, WARNING } from '@/constants/_toastMessage';
import { useGetFoods } from '@/hooks/menu/useGetFoods';
import { useToastStore } from '@/stores/useToastStore';

const MEAL_DEFAULT_PAGE_NUMBER = 1;
const ONE = 1;

type MealCreateProps = {
  date: string;
  handleSaveMenu?: (date: string, menuList: FoodInfo[]) => void;
};

const MealCreate = ({ date, handleSaveMenu }: MealCreateProps) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [allMenuList, setAllMenuList] = useState<{
    [key: string]: FoodInfo[];
  }>({});
  const [menuList, setMenuList] = useState<FoodInfo[]>([]);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [isSearchShow, setIsSearchShow] = useState(true);
  const [searchResultList, setSearchResultList] = useState<FoodInfo[]>([]);
  const [page, setPage] = useState(MEAL_DEFAULT_PAGE_NUMBER);
  const [hasMore, setHasMore] = useState(true);

  const showToast = useToastStore((set) => set.showToast);
  const isSavable = menuList.length > 0;

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

  // 기존 메뉴 클릭(연필모양)
  const handleClickMenu = (menu: string) => {
    setKeyword(menu);
    setClickedMenu(menu);
    setIsSearchShow(true);
    resetPagination();
  };

  const handleSearchClick = () => {
    if (keyword.length < 0) return;
    resetPagination();
    refetch();
  };

  // 메뉴 삭제
  const handleDeleteMenu = () => {
    if (clickedMenu) {
      setMenuList((prevList) =>
        prevList.filter((item) => item.foodName !== clickedMenu),
      );
      setClickedMenu(null);
      setKeyword('');
    } else {
      showToast(MEAL_CREATE_MESSAGE.error.notSelected, 'warning');
    }
  };

  // 메뉴 초기화
  const handleResetMenu = () => {
    setMenuList([]);
    setClickedMenu(null);
    setKeyword('');
  };

  // 검색한 메뉴 목록에서 새로운 메뉴 선택
  const handleClickNewMenu = (menu: string) => {
    const result = searchResultList.find((item) => item.foodName === menu);

    if (!result || !handleSaveMenu) {
      return;
    }

    const isDuplicate = menuList.some(
      (item) => item.foodName === result.foodName,
    );

    if (isDuplicate) {
      showToast(MEAL_CREATE_MESSAGE.error.duplicate, 'warning');
      return;
    }

    setMenuList((prevList) => {
      if (prevList.length >= MAXIUM_MENU_PER_DAY) {
        showToast(MEAL_CREATE_MESSAGE.error.exceed, 'warning');
        return prevList;
      }

      if (clickedMenu) {
        return prevList.map((item) =>
          item.foodName === clickedMenu ? result : item,
        );
      }

      return [...prevList, result];
    });

    setClickedMenu(null);
    setKeyword(menu);
  };

  // 메뉴 저장
  const handleSaveMeal = () => {
    if (menuList.length === 0) {
      showToast(WARNING.noMenuToSave, 'warning');
      return;
    }

    setAllMenuList((prevAllMenuList) => ({
      ...prevAllMenuList,
      [date]: menuList,
    }));

    if (handleSaveMenu) {
      handleSaveMenu(date, menuList);
    }
  };

  useEffect(() => {
    const savedMenu = allMenuList[date] || [];
    setMenuList(savedMenu);
    setClickedMenu(null);
    setKeyword('');
    setSearchResultList([]);
  }, [date, allMenuList]);

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

  return (
    <MealInfoContainer>
      <div className='flex justify-between'>
        <Subtitle2Black>{date}</Subtitle2Black>
        <KcalInfo data={menuList} />
      </div>
      <div className='flex w-full flex-col gap-6'>
        {isSearchShow && (
          <div className='flex w-full justify-between gap-2'>
            <Button
              type='button'
              size='xs'
              variant='outline'
              width='full'
              onClick={handleResetMenu}
            >
              <Subtitle2Black>초기화</Subtitle2Black>
            </Button>
            <Button
              type='button'
              size='xs'
              variant='outline'
              width='full'
              onClick={handleDeleteMenu}
            >
              <Subtitle2Black>메뉴 삭제</Subtitle2Black>
            </Button>
            <Button
              type='button'
              size='xs'
              variant='teritary'
              width='full'
              disabled={!isSavable}
              onClick={handleSaveMeal}
            >
              <Subtitle2White>식단 저장</Subtitle2White>
            </Button>
          </div>
        )}
        <div className={cn('flex min-h-[288px] w-full flex-col gap-4')}>
          {menuList.map((item) => (
            <NutritionMenuButton
              key={item.foodId}
              menuName={item.foodName}
              isFocused={item.foodName === clickedMenu}
              onFocus={() => setIsSearchShow(true)}
              onClick={() => handleClickMenu(item.foodName)}
            />
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex h-12 gap-2'>
            <Input
              placeholder='메뉴 이름을 입력해주세요'
              variant='grey50'
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword || ''}
            />
            <Button
              variant='outline'
              className='min-w-[68px]'
              onClick={handleSearchClick}
            >
              <Subtitle2Black>검색</Subtitle2Black>
            </Button>
          </div>
          {isSearchShow && keyword.length > 0 && (
            <MealSearchContainer
              ref={searchContainerRef}
              keyword={keyword}
              searchResultList={searchResultList}
              onClickNewMenu={handleClickNewMenu}
              isError={isError}
              isLoading={isLoading}
              hasMore={hasMore}
              onScroll={handleSearchContainerScroll}
            />
          )}
        </div>
      </div>
    </MealInfoContainer>
  );
};

export default MealCreate;
