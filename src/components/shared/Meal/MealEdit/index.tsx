import { useEffect, useState } from 'react';
import { FoodInfo } from '@/type/menu/menuResponse';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealSearchContainer from '@/components/shared/Meal/MealSearchContainer';
import NutritionMenuButton from '@/components/shared/Meal/NutritionMenuButton';
import { MOCK_ALL_MENU } from '@/constants/_calendarData';
import { MEAL_CREATE_MESSAGE } from '@/constants/_toastMessage';
import { useToastStore } from '@/stores/useToastStore';

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
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [searchResultList] = useState<FoodInfo[]>(MOCK_ALL_MENU);
  const showToast = useToastStore((state) => state.showToast);

  // 기존 메뉴 클릭 했을 때
  const handleClickMenu = (menu: string) => {
    setKeyword(menu);
    setClickedMenu(menu);
  };

  // 검색창에 keyword 입력 후 검색 버튼 눌렀을 때
  const handleSearchClick = () => {
    // api 요청
    // 받은 데이터로 setSearchResultList 업데이트
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

  useEffect(() => {
    setClickedMenu(null);
    setKeyword('');
    setIsSearchShow(false);
  }, [date]);

  if (!data) return null;

  return (
    <MealInfoContainer date={date}>
      <div className='flex w-full flex-col gap-1'>
        {data.map((item) => (
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
        <KcalInfo data={data} />
      </div>
      {isSearchShow && keyword!.length >= 0 && (
        <MealSearchContainer
          keyword={keyword}
          searchResultList={searchResultList}
          onChange={(e) => setKeyword(e.target.value)}
          onSubmit={handleSearchClick}
          onClickNewMenu={handleClickNewMenu}
        />
      )}
    </MealInfoContainer>
  );
};

export default MealEdit;
