'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FoodInfo } from '@/type/menu/menuResponse';
import { cn } from '@/utils/core';
import Button from '@/components/common/Button/Button';
import { MAXIUM_MENU_PER_DAY } from '@/components/common/CalendarDay';
import Tooltip from '@/components/common/Tooltip';
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
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [searchResultList, setSearchResultList] = useState<FoodInfo[]>([]);
  const [page, setPage] = useState(MEAL_DEFAULT_PAGE_NUMBER);
  const [hasMore, setHasMore] = useState(true);

  const showToast = useToastStore((set) => set.showToast);

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

  // 메뉴 추가 버튼 클릭
  const handleClickAddMenu = () => {
    setIsSearchShow(true);
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

  handleSearchClick();

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
    setIsSearchShow(false);
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
    <MealInfoContainer date={date}>
      <div className='flex w-full flex-col gap-2'>
        {isSearchShow && (
          <div className='ml-auto flex gap-2'>
            <Button
              type='button'
              variant='outline'
              className='y-2 h-fit w-fit p-2'
              onClick={handleSaveMeal}
            >
              식단 저장
            </Button>
            <Tooltip
              content='삭제하고 싶은 메뉴를 클릭 후 메뉴 삭제 버튼을 눌러주세요.'
              position='bottom'
            >
              <Button
                type='button'
                variant='secondary'
                className='y-2 h-fit w-fit p-2'
                onClick={handleDeleteMenu}
              >
                메뉴 삭제
              </Button>
            </Tooltip>
            <Button
              type='button'
              variant='secondary'
              className='y-2 h-fit w-fit p-2'
              onClick={handleResetMenu}
            >
              메뉴 초기화
            </Button>
          </div>
        )}
        <div className='flex w-full flex-col gap-2'>
          <div
            className={cn(
              'flex w-full flex-col gap-1',
              isSearchShow ? 'h-[302px]' : '',
            )}
          >
            {menuList.map((item) => (
              <NutritionMenuButton
                key={item.foodId}
                menuName={item.foodName}
                className={
                  clickedMenu === item.foodName
                    ? 'bg-green-200 hover:bg-green-200'
                    : ''
                }
                onFocus={() => setIsSearchShow(true)}
                onClick={() => handleClickMenu(item.foodName)}
              />
            ))}
            {menuList.length < ONE && !isSearchShow && (
              <Button
                type='button'
                variant='primary'
                onClick={handleClickAddMenu}
              >
                메뉴 등록하기
              </Button>
            )}
          </div>
          <KcalInfo data={menuList} />
        </div>
        {isSearchShow && keyword.length >= 0 && (
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
    </MealInfoContainer>
  );
};

export default MealCreate;
