'use client';
import { useState } from 'react';
import ControlTab from '@/components/ControlTab';
import { Input } from '@/components/Input/Input';
import Radio from '@/components/Radio';
import {
  BodyPrimary,
  HeadPrimary,
  Label,
} from '@/components/Typography/Typography';

const page = () => {
  const value = '추후 useInput를 통해 받아올 value';
  const tabList = ['최신순', '오래된순'];
  const [selectedTab, setSelectedTab] = useState('최신순'); // eslint-disable-line react-hooks/rules-of-hooks
  return (
    <div className='flex flex-col gap-3'>
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
    </div>
  );
};

export default page;
