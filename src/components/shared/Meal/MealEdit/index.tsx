import { useCallback, useEffect, useState } from 'react';
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
  const [searchResult, setSearchResult] = useState<NutritionData[]>([]);

  const handleClickMenu = (menu: string) => {
    setKeyword(menu);
    setClickedMenu(menu);
  };

  const handleChangeKeyword = useCallback(
    (allMenuData: NutritionData[], keyword: string) => {
      const result = allMenuData.filter((item) =>
        item.content.includes(keyword),
      );
      setSearchResult(result);
    },
    [],
  );

  const handleClickNewMenu = (menu: string) => {
    const result = MOCK_ALL_MENU.find((item) => item.content === menu);

    if (result && handleChangeMenu) {
      const menuName =
        data.find((item) => item.content === clickedMenu)?.content || '';
      handleChangeMenu(date, menuName, result);
    }
  };

  useEffect(() => {
    handleChangeKeyword(MOCK_ALL_MENU, keyword);
  }, [keyword, handleChangeKeyword]);

  useEffect(() => {
    setClickedMenu('');
    setKeyword('');
  }, [date]);

  if (!data) return null;

  return (
    <MealInfoContainer date={date}>
      <div className='flex w-full flex-col gap-1'>
        {data?.map((item) => {
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
        {isSearchShow && (
          <Input
            className='text-md placeholder:text-md font-semibold'
            type='search'
            placeholder='메뉴 이름을 입력해주세요'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword || ''}
          />
        )}
        {keyword && (
          <div className='custom-scrollbar max-h-[500px] w-full overflow-y-auto rounded-md bg-white-200 p-2'>
            {searchResult.length === 0 ? (
              <NutritionMenu>메뉴가 존재하지 않습니다</NutritionMenu>
            ) : (
              <MealTable
                data={searchResult}
                isButton
                onClick={handleClickNewMenu}
              />
            )}
          </div>
        )}
      </div>
    </MealInfoContainer>
  );
};

export default MealEdit;
