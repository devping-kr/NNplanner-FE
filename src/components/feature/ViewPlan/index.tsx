'use client';

import { useState } from 'react';
import Pagination from '@/components/common/Pagination';
import GetAllListControls from '@/components/shared/GetAllList/Controls';
import GetAllListHeader from '@/components/shared/GetAllList/Header';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { TAB_OPTIONS } from '@/constants/_controlTab';
import { PLAN_DATA } from '@/constants/_getAllList/_planData';

const ViewPlan = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString(),
  );
  const [searchValue, setSearchValue] = useState('');
  const [organization, setOrganization] = useState<null | string>(null);
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const handlechangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const submitSearchValue = () => {
    // TODO: api request body로 보내줄 식단이름 제출함수
    console.log('검색 버튼 클릭');
  };

  return (
    <div className='flex flex-col gap-8'>
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
        submitSearchValue={submitSearchValue}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <GetAllListTable data={PLAN_DATA} />
      <Pagination
        limit={8}
        page={page}
        setPage={setPage}
        totalPosts={PLAN_DATA.length}
      />
    </div>
  );
};

export default ViewPlan;