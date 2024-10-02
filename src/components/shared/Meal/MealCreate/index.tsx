import { useEffect, useState } from 'react';
import Button from '@/components/common/Button/Button';
import { MAXIUM_MENU_PER_DAY } from '@/components/common/CalendarDay';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealSearchContainer from '@/components/shared/Meal/MealSearchContainer';
import { NutritionData } from '@/components/shared/Meal/NutritionInfo';
import NutritionMenuButton from '@/components/shared/Meal/NutritionMenuButton';
import { MOCK_ALL_MENU } from '@/constants/_calendarData';
import { MEAL_CREATE_MESSAGE } from '@/constants/_toastMessage';
import { useToastStore } from '@/stores/useToastStore';

type MealCreateProps = {
  date: string;
  handleChangeMenu?: (
    date: string,
    menuName: string,
    updatedItem: NutritionData,
    type: 'edit' | 'add',
  ) => void;
};

const MealCreate = ({ date, handleChangeMenu }: MealCreateProps) => {
  const [allMenuList, setAllMenuList] = useState<{
    [key: string]: NutritionData[];
  }>({});
  const [menuList, setMenuList] = useState<NutritionData[]>([]);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [searchResultList] = useState<NutritionData[]>(MOCK_ALL_MENU);
  const { showToast } = useToastStore();

  const handleClickAddMenu = () => {
    setIsSearchShow(true);
  };

  const handleClickMenu = (menu: string) => {
    setKeyword(menu);
    setClickedMenu(menu);
    setIsSearchShow(true);
  };

  const handleSearchClick = () => {
    // api 요청
  };

  const handleDeleteMenu = () => {
    if (clickedMenu) {
      setMenuList((prevList) =>
        prevList.filter((item) => item.content !== clickedMenu),
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
    const result = searchResultList.find((item) => item.content === menu);

    if (result && handleChangeMenu) {
      const isDuplicate = menuList.some(
        (item) => item.content === result.content,
      );

      if (isDuplicate) {
        showToast(MEAL_CREATE_MESSAGE.error.duplicate, 'warning');
        return;
      }

      setMenuList((prevList) => {
        if (prevList.length < MAXIUM_MENU_PER_DAY) {
          if (clickedMenu) {
            const updatedMenuList = prevList.map((item) =>
              item.content === clickedMenu ? result : item,
            );
            return updatedMenuList;
          } else {
            const addedMenuList = [...prevList, result];
            return addedMenuList;
          }
        } else {
          showToast(MEAL_CREATE_MESSAGE.error.exceed, 'warning');
          return prevList;
        }
      });
    }
    setKeyword(menu);
  };

  const handleSaveMeal = () => {
    setAllMenuList((prevAllMenuList) => ({
      ...prevAllMenuList,
      [date]: menuList,
    }));

    menuList.forEach((menu) => {
      if (handleChangeMenu) {
        handleChangeMenu(date, menu.content, menu, 'add');
      }
    });

    showToast(`${date} ${MEAL_CREATE_MESSAGE.success.saveMeal}`, 'success');
  };

  useEffect(() => {
    const savedMenu = allMenuList[date] || [];
    setMenuList(savedMenu);
    setClickedMenu('');
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
            <Button
              type='button'
              variant='secondary'
              className='y-2 h-fit w-fit p-2'
              onClick={handleDeleteMenu}
            >
              메뉴 삭제
            </Button>
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
        <div className='flex w-full flex-col gap-1'>
          {menuList.map((item) => (
            <NutritionMenuButton
              key={item.id}
              menuName={item.content}
              className={
                clickedMenu === item.content
                  ? 'bg-green-200 hover:bg-green-200'
                  : ''
              }
              onFocus={() => setIsSearchShow(true)}
              onClick={() => handleClickMenu(item.content)}
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
