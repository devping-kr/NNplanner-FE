import { useEffect, useState } from 'react';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealSearchContainer from '@/components/shared/Meal/MealSearchContainer';
import { NutritionData } from '@/components/shared/Meal/NutritionInfo';
import NutritionMenuButton from '@/components/shared/Meal/NutritionMenuButton';
import { MOCK_ALL_MENU } from '@/constants/_calendarData';
import { MEAL_CREATE_MESSAGE } from '@/constants/_toastMessage';
import { useToastStore } from '@/stores/useToastStore';

type MealEditProps = {
  date: string;
  data: NutritionData[];
  handleChangeMenu?: (
    date: string,
    menuName: string,
    updatedItem: NutritionData,
    type: 'edit' | 'add',
  ) => void;
};

const MealEdit = ({ date, data, handleChangeMenu }: MealEditProps) => {
  const [clickedMenu, setClickedMenu] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [searchResultList] = useState<NutritionData[]>(MOCK_ALL_MENU);
  const { showToast } = useToastStore();

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
    const result = searchResultList.find((item) => item.content === menu);

    if (result && handleChangeMenu) {
      const isDuplicate = data.some((item) => item.content === result.content);

      if (isDuplicate) {
        showToast(MEAL_CREATE_MESSAGE.error.duplicate, 'warning');
        return;
      }

      const menuName =
        data.find((item) => item.content === clickedMenu)?.content || '';
      handleChangeMenu(date, menuName, result, 'edit');

      setClickedMenu(menu);
      setKeyword(menu);
      setIsSearchShow(false);
    }
  };

  useEffect(() => {
    setClickedMenu('');
    setKeyword('');
    setIsSearchShow(false);
  }, [date]);

  if (!data) return null;

  return (
    <MealInfoContainer date={date}>
      <div className='flex w-full flex-col gap-1'>
        {data.map((item) => (
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
