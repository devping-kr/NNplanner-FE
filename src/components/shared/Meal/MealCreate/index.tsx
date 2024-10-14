import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { FoodInfo } from '@/type/menu/menuResponse';
import { FailResponse, Result } from '@/type/response';
import { cn } from '@/utils/core';
import Button from '@/components/common/Button/Button';
import { MAXIUM_MENU_PER_DAY } from '@/components/common/CalendarDay';
import Tooltip from '@/components/common/Tooltip';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealSearchContainer from '@/components/shared/Meal/MealSearchContainer';
import NutritionMenuButton from '@/components/shared/Meal/NutritionMenuButton';
import { MEAL_CREATE_MESSAGE, WARNING } from '@/constants/_toastMessage';
import { useGetFoods } from '@/hooks/menu/useGetFoods';
import { useToastStore } from '@/stores/useToastStore';

type MealCreateProps = {
  date: string;
  handleSaveMenu?: (date: string, menuList: FoodInfo[]) => void;
};

const MealCreate = ({ date, handleSaveMenu }: MealCreateProps) => {
  const [allMenuList, setAllMenuList] = useState<{
    [key: string]: FoodInfo[];
  }>({});
  const [menuList, setMenuList] = useState<FoodInfo[]>([]);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [searchResultList, setSearchResultList] = useState<FoodInfo[]>([]);
  const { showToast } = useToastStore();

  const { mutate: getFoodMutate } = useGetFoods();

  const handleClickAddMenu = () => {
    setIsSearchShow(true);
  };

  const handleClickMenu = (menu: string) => {
    setKeyword(menu);
    setClickedMenu(menu);
    setIsSearchShow(true);
  };

  const handleSearchClick = () => {
    getFoodMutate(
      { foodName: keyword },
      {
        onSuccess: ({ message, data }: Result<FoodInfo[]>) => {
          showToast(message, 'success', 1000);
          setSearchResultList(data);
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error?.response?.data?.message || '메뉴 검색 실패';
          showToast(errorMessage, 'warning', 1000);
        },
      },
    );
  };

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

  const handleResetMenu = () => {
    setMenuList([]);
    setClickedMenu(null);
    setKeyword('');
  };

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

    showToast(`${date} ${MEAL_CREATE_MESSAGE.success.saveMeal}`, 'success');
  };

  useEffect(() => {
    const savedMenu = allMenuList[date] || [];
    setMenuList(savedMenu);
    setClickedMenu(null);
    setKeyword('');
    setIsSearchShow(false);
  }, [date, allMenuList]);

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
            {menuList.length < 1 && !isSearchShow && (
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
            keyword={keyword}
            searchResultList={searchResultList}
            onChange={(e) => setKeyword(e.target.value)}
            onSubmit={handleSearchClick}
            onClickNewMenu={handleClickNewMenu}
          />
        )}
      </div>
    </MealInfoContainer>
  );
};

export default MealCreate;
