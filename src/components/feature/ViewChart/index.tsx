'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { survey } from '@/api/survey';
import Pagination from '@/components/common/Pagination';
import GetAllListControls from '@/components/shared/GetAllList/Controls';
import GetAllListHeader from '@/components/shared/GetAllList/Header';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { SURVEY_FILTER_OPTIONS, TAB_OPTIONS } from '@/constants/_controlTab';
import { SURVEY_DATA } from '@/constants/_getAllList/_surveyData';

const ViewChart = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString(),
  );
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>(
    SURVEY_FILTER_OPTIONS[0],
  );
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const handlechangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const submitSearchValue = () => {
    // TODO: api request body로 보내줄 설문이름 제출함수
    console.log('검색 버튼 클릭');
  };

  const { data, isLoading } = useQuery({
    queryKey: ['surveyList'],
    queryFn: () => survey.getSurveyList(),
  });
  if (data) {
    console.log(data.data.surveys);
  }

  // react-query문제 디버깅용
  // useEffect(() => {
  //   const fetchSurveys = async () => {
  //     try {
  //       setIsLoading(true); // 로딩 상태 활성화
  //       const data = await survey.getSurveyList(); // 설문 목록 불러오기
  //       setSurveyData(data.data.surveys); // 불러온 데이터 상태에 저장
  //     } catch (err) {
  //       setError('Failed to fetch survey list'); // 에러 발생 시 설정
  //     } finally {
  //       setIsLoading(false); // 로딩 상태 비활성화
  //     }
  //   };

  //   fetchSurveys();
  // }, []); // 컴포넌트가 마운트될 때만 실행

  // 추후 react-query queryKey에 filter된 데이터 캐싱예정
  const filterSurveys = (filterTab: string) => {
    if (filterTab === '전체') {
      return SURVEY_DATA;
    }
    return SURVEY_DATA.filter((survey) => survey.state === filterTab);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col gap-4'>
      <GetAllListHeader title='설문 결과 리스트' />
      <GetAllListControls
        type='viewChart'
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
        searchValue={searchValue}
        handlechangeSearchValue={handlechangeSearchValue}
        submitSearchValue={submitSearchValue}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        inputPlaceholder='설문 이름을 입력해주세요.'
      />
      <GetAllListTable data={filterSurveys(selectedFilter)} />
      <Pagination
        limit={8}
        page={page}
        setPage={setPage}
        totalPosts={SURVEY_DATA.length}
      />
    </div>
  );
};

export default ViewChart;
