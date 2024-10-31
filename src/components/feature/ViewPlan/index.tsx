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

// TODO: constant 파일로 관리
const PAGE_LIMIT = 8;
const SORT_DESC = 'createdAt,desc';
const SORT_ASC = 'createdAt,asc';
const DEFAULT_PAGE = 1;

const ViewPlan = () => {
  const searchParam = useSearchParams();
  const { navigate } = useNavigate();
  const sort = searchParam.get('sort') as string;
  const currentTab = sort ?? (TAB_OPTIONS[0] as string);
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
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  // TODO : 식단 검색 api 연결 - 오래된 순
  // 1. 검색어 검색 시 리스폰스는 잘 오는데 화면에 연결 안 됨 -> state 추가해서 해결
  // 2. 카테고리 눌러놓으면 / 검색 한 번 누르고 나면?검색어 value 변경 시 마다 검색 api 트리거됨
  // 3. 카테고리 눌러놔도 어느 순간 대분류가 placeholder로 바뀌어있음 -> control select에 기본값 추가
  // 4. 검색어나 날짜 선택, 카테고리 선택하고 오래된 순 정렬이 안 된다. -> 우선 카테고리가 있어도 정렬 누르면 검색 api 트리거가 안됨

  const { data: mealList, refetch: mealRefetch } = useGetMealList({
    page,
    sort: currentTab === TAB_OPTIONS[0] ? SORT_DESC : SORT_ASC,
    size: PAGE_LIMIT,
  });

  const searchTriggerCondition =
    // 1. 대분류, 소분류 값있을 때
    !!(selectedOrganization && selectedCategory) ||
    // 2. 기본 연월과 다른 연월 선택했을 때
    !!(
      selectedYear !== year.toString() || selectedMonth !== month.toString()
    ) ||
    // 3. 오래된 순이면서
    // 전체 식단 오래된 순 정렬은 이미 존재하므로 (식단 전체 조회) 다른 파람들 중에 유효한 값이 하나라도 있어야 함
    !!(
      selectedTab !== TAB_OPTIONS[0] &&
      // 대분류 + 소분류 선택되거나
      ((selectedOrganization && selectedCategory) ||
        // 기본 연월과 다른 연월 선택했을 때
        selectedYear !== year.toString() ||
        selectedMonth !== month.toString())
    ) ||
    // 4. 검색어 있고 검색버튼 클릭 됐을 때
    !!isSearchClicked;

  const { data: searchMealList, refetch: searchMealRefetch } =
    useGetSearchMealList(
      {
        page: page,
        sort: selectedTab === TAB_OPTIONS[0] ? SORT_DESC : SORT_ASC,
        size: PAGE_LIMIT,
        majorCategory: selectedOrganization || undefined,
        minorCategory: selectedCategory || undefined,
        menuName: searchValue || undefined,
        year: selectedYear || undefined,
        month: selectedMonth || undefined,
      },
      {
        enabled: searchTriggerCondition,
      },
    );

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const submitSearchValue = () => {
    if (!searchValue) return;
    setPage(DEFAULT_PAGE);
    searchMealRefetch();
    setIsSearchClicked(true);
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
    if (!searchTriggerCondition && !isSearchClicked) {
      mealRefetch();
    } else {
      searchMealRefetch();
    }
    setPage(DEFAULT_PAGE);
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
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchValue={searchValue}
            handleChangeSearchValue={handleChangeSearchValue}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            inputPlaceholder='식단 이름을 입력해주세요.'
            handleSearchSubmit={submitSearchValue}
            minorCategories={minorCategories}
          />
          {mealList.data.totalElements === 0 ||
          searchMealList?.data.totalElements === 0 ? (
            <HeadPrimary>식단이 존재하지 않습니다</HeadPrimary>
          ) : (
            <>
              <GetAllListTable
                data={convertToTableRowData(
                  searchTriggerCondition || isSearchClicked
                    ? (searchMealList?.data?.menuResponseDTOList ?? [])
                    : mealList.data.menuResponseDTOList,
                )}
                onRowClick={(id) => handleClickRow(String(id))}
              />
              <Pagination
                limit={PAGE_LIMIT}
                page={page}
                setPage={setPage}
                totalPosts={
                  searchTriggerCondition || isSearchClicked
                    ? (searchMealList?.data.totalElements ?? 0)
                    : mealList.data.totalElements
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
