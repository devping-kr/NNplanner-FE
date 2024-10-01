import { useEffect, useState } from 'react';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { NutritionMenu } from '@/components/common/Typography';
import KcalInfo from '@/components/shared/Meal/KcalInfo';
import MealInfoContainer from '@/components/shared/Meal/MealInfoContainer';
import MealTable from '@/components/shared/Meal/MealTable';
import { NutritionData } from '@/components/shared/Meal/NutritionInfo';
import { MOCK_ALL_MENU } from '@/constants/_calendarData';

type MealEditProps = {
  date: string;
  data: NutritionData[];
  handleChangeMenu?: (
    date: string,
    menuName: string,
    updatedItem: NutritionData,
  ) => void;
};

const MealEdit = ({ date, data, handleChangeMenu }: MealEditProps) => {
  const [clickedMenu, setClickedMenu] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [searchResultList] = useState<NutritionData[]>(MOCK_ALL_MENU);

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
      const menuName =
        data.find((item) => item.content === clickedMenu)?.content || '';
      handleChangeMenu(date, menuName, result);

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
        {data.map((item) => {
          return (
            <button
              key={item.id}
              className={`flex w-full justify-between rounded-md p-2 transition duration-300 ease-in-out hover:bg-green-100 hover:text-gray-900 focus:bg-green-200 active:bg-green-200 ${clickedMenu === item.content && 'bg-green-200 hover:bg-green-200'}`}
              onFocus={() => setIsSearchShow(true)}
              onClick={() => handleClickMenu(item.content)}
            >
              <NutritionMenu>{item.content}</NutritionMenu>
              <Icon name='edit' />
            </button>
          );
        })}
        <KcalInfo data={data} />
      </div>
      <div className='flex w-full flex-col gap-2'>
        {isSearchShow && keyword!.length >= 0 && (
          <>
            <Input
              className='text-md placeholder:text-md font-semibold'
              placeholder='메뉴 이름을 입력해주세요'
              bgcolor='search'
              includeButton
              onChange={(e) => setKeyword(e.target.value)}
              onSubmit={handleSearchClick}
              value={keyword || ''}
            />
            <div className='custom-scrollbar max-h-[500px] w-full overflow-y-auto rounded-md bg-white-200 p-2'>
              {searchResultList.length === 0 ? (
                <NutritionMenu>메뉴가 존재하지 않습니다</NutritionMenu>
              ) : (
                <MealTable
                  data={searchResultList}
                  isButton
                  onClick={handleClickNewMenu}
                />
              )}
            </div>
          </>
        )}
      </div>
    </MealInfoContainer>
  );
};

export default MealEdit;
