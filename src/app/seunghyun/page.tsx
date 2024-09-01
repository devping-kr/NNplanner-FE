'use client';
import Image from 'next/image';
import Search from '@/assets/icons/search.svg';
import Xmark from '@/assets/icons/xmark.svg';
import { Input } from '@/components/Input/Input';
import NavMenu from '@/components/NavMenu';
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
      <NavMenu isActive={true} href={'/auto'}>
        <Image src={Search} alt='search' width={15} height={15} />
        자동 식단 작성
      </NavMenu>
      <NavMenu isActive={false} href={'/hand'}>
        <Image src={Xmark} alt='xmark' width={15} height={15} />
        수동 식단 작성
      </NavMenu>
    </div>
  );
};

export default page;
