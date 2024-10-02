'use client';

import { useState } from 'react';
import ControlTab from '@/components/common/ControlTab';
import DatePicker from '@/components/common/DatePicker';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import NavMenu from '@/components/common/NavMenu';
import Pagination from '@/components/common/Pagination';
import Radio from '@/components/common/Radio';

import {
  BodyPrimary,
  HeadPrimary,
  Label,
} from '@/components/common/Typography';

const page = () => {
  const value = '추후 useInput를 통해 받아올 value';
  const tabList = ['최신순', '오래된순'];
  const [selectedTab, setSelectedTab] = useState('최신순'); // eslint-disable-line react-hooks/rules-of-hooks
  const limit = 4;
  const [page, setPage] = useState(1); // eslint-disable-line react-hooks/rules-of-hooks
  // const [selection, setSelection] = useState(new Set()); // eslint-disable-line react-hooks/rules-of-hooks
  const [selectedYear, setSelectedYear] = useState<string>( // eslint-disable-line react-hooks/rules-of-hooks
    new Date().getFullYear().toString(),
  );
  const [selectedMonth, setSelectedMonth] = useState<string>( // eslint-disable-line react-hooks/rules-of-hooks
    (new Date().getMonth() + 1).toString(),
  );

  return (
    <div className='mb-60 flex flex-col gap-3'>
      <BodyPrimary>바디 Primary색상임다</BodyPrimary>
      <HeadPrimary>헤더 Primary색상임다</HeadPrimary>
      <Label>라벨임다</Label>
      <Input />
      <Input isLeftIcon={true} />
      <Input includeButton value={value} />
      <Input bgcolor={'search'} height={'large'} borderRadius={'large'} />
      <Input
        bgcolor={'search'}
        height={'large'}
        borderRadius={'large'}
        isLeftIcon={true}
      />
      <Input
        bgcolor={'search'}
        height={'large'}
        borderRadius={'large'}
        isLeftIcon={true}
        includeButton
        value={value}
      />
      <Input disabled />
      <NavMenu isActive={true} href={'/auto'}>
        <Icon name='edit' width={15} height={15} />
        자동 식단 작성
      </NavMenu>
      <NavMenu isActive={false} href={'/hand'}>
        <Icon name='search' width={15} height={15} />
        수동 식단 작성
      </NavMenu>
      <ControlTab
        controlTabItems={tabList}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className='flex gap-4'>
        <div className='flex items-center gap-1'>
          <Radio color='primary' name='test' />
          <Label>test1</Label>
        </div>
        <div className='flex items-center gap-1'>
          <Radio color='secondary' name='test' />
          <Label>test2</Label>
        </div>
      </div>
      <div>
        <Pagination
          limit={limit}
          page={page}
          setPage={setPage}
          totalPosts={26}
          // setSelection={setSelection}
        />
      </div>
      <div>
        <DatePicker
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
        />
      </div>
    </div>
  );
};

export default page;
