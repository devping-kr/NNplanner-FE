'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { surveyType } from '@/type/survey/surveyResponse';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import Pagination from '@/components/common/Pagination';
import GetAllListControls from '@/components/shared/GetAllList/Controls';
import GetAllListHeader from '@/components/shared/GetAllList/Header';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { SURVEY_FILTER_OPTIONS, TAB_OPTIONS } from '@/constants/_controlTab';
import { useGetSurveyList } from '@/hooks/survey/useGetSurveyList';

const ViewChart = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const sort = searchParam.get('sort') as string;
  const currentTab = sort ?? ('최신순' as string);

  const { month, year } = getCurrentYearMonthNow();

  const [searchValue, setSearchValue] = useState('');
  const [actualSearchValue, setActualSearchValue] = useState('');

  const [selectedYear, setSelectedYear] = useState<string>(year.toString());
  const [selectedMonth, setSelectedMonth] = useState<string>(month.toString());
  const [selectedFilter, setSelectedFilter] = useState<string>(
    SURVEY_FILTER_OPTIONS[0],
  );
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === '') {
      setActualSearchValue('');
    }
  };

  const handleSearchSubmit = () => {
    setActualSearchValue(searchValue);
  };

  const { data: surveyList, refetch } = useGetSurveyList({
    page,
    sort: currentTab === '최신순' ? 'createdAt,desc' : 'createdAt,asc',
    search: actualSearchValue,
    state:
      selectedFilter === '전체'
        ? ''
        : selectedFilter === '진행중'
          ? 'IN_PROGRESS'
          : 'CLOSED',
    //TODO: 날짜 param
    startDate: `${selectedYear}-${selectedMonth}-01`,
    endDate: `${selectedYear}-${selectedMonth}-31`,
  });

  useEffect(() => {
    refetch();
  }, [selectedFilter, refetch]);

  const formatSurveyList = (surveys: surveyType[]) => {
    return surveys.map((survey) => ({
      ...survey,
      createdAt: dayjs(survey.createdAt).format('YYYY-MM-DD'),
      deadlineAt: dayjs(survey.deadlineAt).format('YYYY-MM-DD'),
      state: survey.state === 'IN_PROGRESS' ? '진행중' : '마감',
    }));
  };

  return (
    <div className='flex flex-col gap-4'>
      {surveyList && (
        <>
          <GetAllListHeader title='설문 결과 리스트' />
          <GetAllListControls
            type='viewChart'
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            searchValue={searchValue}
            handlechangeSearchValue={handleChangeSearchValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            inputPlaceholder='설문 이름을 입력해주세요.'
            handleSearchSubmit={handleSearchSubmit}
          />
          <GetAllListTable
            data={formatSurveyList(surveyList.data.surveys)}
            onRowClick={(id: number) => router.push(`/viewChart/${id}`)}
          />
          <Pagination
            limit={8}
            page={page}
            setPage={setPage}
            totalPosts={surveyList.data.totalItems}
          />
        </>
      )}
    </div>
  );
};

export default ViewChart;
