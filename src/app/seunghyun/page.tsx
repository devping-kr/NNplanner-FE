'use client';
import { Input } from '@/components/Input/Input';
import Radio from '@/components/Radio';
import {
  BodyPrimary,
  HeadPrimary,
  Label,
} from '@/components/Typography/Typography';

const page = () => {
  const value = '추후 useInput를 통해 받아올 value';
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
