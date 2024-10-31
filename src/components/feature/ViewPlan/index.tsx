'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { MenuResponseDTO } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import { findOriginalId } from '@/utils/findOriginalId';
import Pagination from '@/components/common/Pagination';
import { Option } from '@/components/common/Selectbox';
import { TableRowData } from '@/components/common/Table';
import { HeadPrimary } from '@/components/common/Typography';
import GetAllListControls from '@/components/shared/GetAllList/Controls';
import GetAllListHeader from '@/components/shared/GetAllList/Header';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { CATEGORY_MAPPINGS } from '@/constants/_category';
import { TAB_OPTIONS } from '@/constants/_controlTab';
import { ROUTES } from '@/constants/_navbar';
import { useGetMealList } from '@/hooks/meal/useGetMealList';
import { useGetSearchMealList } from '@/hooks/meal/useGetSearchMealList';
import { usePrefetchMinorCategories } from '@/hooks/menuCategory/usePrefetchMinorCategories';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';

const PAGE_LIMIT = 8;

const ViewPlan = () => {
  const searchParam = useSearchParams();
  const { navigate } = useNavigate();
  const sort = searchParam.get('sort') as string;
  const currentTab = sort ?? ('최신순' as string);
  const showToast = useToastStore((state) => state.showToast);

  const queryClient = useQueryClient();
  const { prefetchMinorCategories, hasCategories } =
    usePrefetchMinorCategories();
  const [minorCategories, setMinorCategories] = useState<Option[]>([]);

  const { month, year } = getCurrentYearMonthNow();
  const [selectedYear, setSelectedYear] = useState<string>(year.toString());
  const [selectedMonth, setSelectedMonth] = useState<string>(month.toString());
  const [searchValue, setSearchValue] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const { data: mealList, refetch } = useGetMealList({
    //TODO: page기본값 1로 바뀌면 다시 page로 수정해야함
    page: page - 1,
    sort: currentTab === '최신순' ? 'createdAt,desc' : 'createdAt,asc',
    size: 8,
  });

  const { data: searchMealList } = useGetSearchMealList({
    page: page - 1,
    sort: currentTab === '최신순' ? 'createdAt,desc' : 'createdAt,asc',
    size: 8,
    majorCategory: selectedOrganization ?? '',
    minorCategory: selectedCategory ?? '',
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
      식단ID: menu.monthMenuId.slice(0, 4),
      식단이름: menu.monthMenuName,
      대분류: menu.majorCategory,
      소분류: menu.minorCategory,
      생성일: dayjs(menu.createAt).format('YYYY-MM-DD'),
    }));
  };

  useEffect(() => {
    refetch();
  }, [selectedTab]);

  useEffect(() => {
    if (!selectedOrganization) return;

    const selectedMapping = CATEGORY_MAPPINGS.find(
      (organization) => organization.category === selectedOrganization,
    );

    if (selectedMapping) {
      const queryKey = [selectedMapping.queryKey];
      const cachedMinorCategories =
        queryClient.getQueryData<Result<string[]>>(queryKey);

      if (!cachedMinorCategories) return;

      if (cachedMinorCategories) {
        const formattedData = cachedMinorCategories.data?.map((category) => ({
          value: category,
          label: category,
        }));
        setMinorCategories(formattedData);
      }
      if (!hasCategories) {
        showToast('소분류가 없습니다.', 'warning', 1000);
      }
    }
  }, [selectedOrganization, queryClient, hasCategories]);

  useEffect(() => {
    if (!hasCategories) {
      prefetchMinorCategories();
    }
  }, [hasCategories, prefetchMinorCategories]);

  const handleClickRow = (id: string) => {
    if (!mealList?.data && !searchMealList?.data) return;
    const selectedMenuList =
      selectedCategory === ''
        ? mealList!.data.menuResponseDTOList
        : searchMealList?.data?.menuResponseDTOList || [];

    findOriginalId({
      list: selectedMenuList,
      matchField: 'monthMenuId',
      matchValue: id,
      navigateTo: ROUTES.VIEW.PLAN,
      getId: (menu) => menu.monthMenuId,
      navigate,
    });
  };

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
            organization={selectedOrganization}
            setOrganization={setSelectedOrganization}
            searchValue={searchValue}
            handlechangeSearchValue={handlechangeSearchValue}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            inputPlaceholder='식단 이름을 입력해주세요.'
            handleSearchSubmit={submitSearchValue}
            minorCategories={minorCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {mealList.data.menuResponseDTOList.length === 0 ||
          searchMealList?.data.menuResponseDTOList.length === 0 ? (
            <HeadPrimary>식단이 존재하지 않습니다</HeadPrimary>
          ) : (
            <>
              <GetAllListTable
                data={convertToTableRowData(
                  selectedCategory === ''
                    ? mealList.data.menuResponseDTOList
                    : searchMealList?.data?.menuResponseDTOList || [],
                )}
                onRowClick={(id) => handleClickRow(String(id))}
              />
              <Pagination
                limit={PAGE_LIMIT}
                page={page}
                setPage={setPage}
                totalPosts={
                  selectedCategory === ''
                    ? mealList.data.totalElements
                    : searchMealList?.data?.totalElements || 0
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ViewPlan;
