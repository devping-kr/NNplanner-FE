'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { MenuResponseDTO } from '@/type/menu/menuResponse';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import Pagination from '@/components/common/Pagination';
import { TableRowData } from '@/components/common/Table';
import { HeadPrimary } from '@/components/common/Typography';
import GetAllListControls from '@/components/shared/GetAllList/Controls';
import GetAllListHeader from '@/components/shared/GetAllList/Header';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { TAB_OPTIONS } from '@/constants/_controlTab';
import { useGetMealList } from '@/hooks/meal/useGetMealList';

const ViewPlan = () => {
  const searchParam = useSearchParams();
  const sort = searchParam.get('sort') as string;
  const currentTab = sort ?? ('최신순' as string);

  const { month, year } = getCurrentYearMonthNow();
  const [selectedYear, setSelectedYear] = useState<string>(year.toString());
  const [selectedMonth, setSelectedMonth] = useState<string>(month.toString());
  const [searchValue, setSearchValue] = useState('');
  const [organization, setOrganization] = useState<null | string>(null);
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const { data: mealList, refetch } = useGetMealList({
    //TODO: page기본값 1로 바뀌면 다시 page로 수정해야함
    page: page - 1,
    sort: currentTab === '최신순' ? 'createdAt,desc' : 'createdAt,asc',
    size: 8,
  });

  const handlechangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const submitSearchValue = () => {
    // TODO: api request body로 보내줄 식단이름 제출함수
    console.log('검색 버튼 클릭');
  };

  const convertToTableRowData = (menus: MenuResponseDTO[]): TableRowData[] => {
    return menus.map((menu) => ({
      식단ID: menu.monthMenuId.split('-')[0],
      식단이름: menu.monthMenuName,
      대분류: menu.majorCategory,
      소분류: menu.minorCategory,
      생성일: dayjs(menu.createAt).format('YYYY-MM-DD'),
    }));
  };

  useEffect(() => {
    refetch();
  }, [selectedTab, refetch]);

  return (
    <div className='flex flex-col gap-4'>
      {mealList && (
        <>
          <GetAllListHeader title={'내가 작성한 식단'} />
          <GetAllListControls
            type='viewPlan'
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            organization={organization}
            setOrganization={setOrganization}
            searchValue={searchValue}
            handlechangeSearchValue={handlechangeSearchValue}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            inputPlaceholder='식단 이름을 입력해주세요.'
            handleSearchSubmit={submitSearchValue}
          />
          {mealList.data.menuResponseDTOList.length === 0 ? (
            <HeadPrimary>식단이 존재하지 않습니다</HeadPrimary>
          ) : (
            <>
              <GetAllListTable
                data={convertToTableRowData(mealList.data.menuResponseDTOList)}
              />
              <Pagination
                limit={8}
                page={page}
                setPage={setPage}
                totalPosts={mealList.data.totalElements}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ViewPlan;
