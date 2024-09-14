'use client';

import { useState } from 'react';
import GetAllListControls from '@/components/shared/GetAllList/Controls';
import GetAllListHeader from '@/components/shared/GetAllList/Header';
import { TAB_OPTIONS } from '@/constants/_controlTab';

const ViewPlan = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString(),
  );
  const [organization, setOrganization] = useState<null | string>(null);
  const [selectedTab, setSelectedTab] = useState<string>(TAB_OPTIONS[0]);

  const handleSearchName = () => {
    console.log('이름 검색');
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
        handleSearchName={handleSearchName}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
};

export default ViewPlan;
