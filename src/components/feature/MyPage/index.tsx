'use client';

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import {
  BodyGray,
  CardTitle,
  NutritionDate,
  NutritionEtc,
} from '@/components/common/Typography';
import MyPageHeader from '@/components/shared/MyPage/Header';

const imageInfo = {
  size: 150,
  src: '/imgs/pi-gon-ping.jpg',
};

const userData = {
  name: '내 이름',
  email: 'test123@naver.com',
};

const MyPage = () => {
  const [isOpenPasswordChange, setIsOpenPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

  const handleOpenPasswordChange = () => {
    setIsOpenPasswordChange(!isOpenPasswordChange);
  };

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handleCheckPassword = () => {
    console.log('비밀번호 확인 요청');
  };

  return (
    <div className='flex flex-col gap-5'>
      <MyPageHeader title='마이 페이지' />
      <div className='flex gap-3'>
        <div className='flex w-1/3 flex-col items-center justify-center gap-1 rounded border border-gray-300 bg-white-100 p-5'>
          <Image
            src={imageInfo.src}
            width={imageInfo.size}
            height={imageInfo.size}
            alt='유저 이미지'
            className='mb-4 rounded-full'
          />
          <BodyGray>{userData.name}</BodyGray>
          <BodyGray>{userData.email}</BodyGray>
        </div>
        <div className='flex w-full flex-col gap-5 rounded border border-gray-300 bg-white-100 p-5'>
          <CardTitle>내 정보</CardTitle>
          <div className='flex gap-4'>
            <div className='flex w-full items-center gap-2 rounded border border-dashed border-gray-300 px-3 py-6'>
              <NutritionEtc>이름</NutritionEtc>
              <NutritionDate>{userData.name}</NutritionDate>
            </div>
            <div className='flex w-full items-center gap-2 rounded border border-dashed border-gray-300 px-3 py-6'>
              <NutritionEtc>이메일</NutritionEtc>
              <NutritionDate>{userData.email}</NutritionDate>
            </div>
          </div>
          <div className='flex h-full w-full items-end justify-end gap-4'>
            <Button onClick={handleOpenPasswordChange} width='fit'>
              비밀번호 변경
            </Button>
            <button className='border-b border-gray-300 text-xs text-gray-300'>
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
      {isOpenPasswordChange ? (
        <div className='flex w-full flex-col items-center gap-5 rounded border border-gray-300 bg-white-100 p-5'>
          <div className='flex w-full items-center justify-center gap-3'>
            <div className='w-40'>
              <NutritionDate>현재 비밀번호</NutritionDate>
            </div>
            <div className='w-1/3'>
              <Input
                placeholder='현재 비밀번호를 입력하세요.'
                includeButton={true}
                onSubmit={handleCheckPassword}
                buttonText='확인'
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
            </div>
          </div>
          <div className='flex w-full items-center justify-center gap-3'>
            <div className='w-40'>
              <NutritionDate>변경 비밀번호</NutritionDate>
            </div>
            <div className='w-1/3'>
              <Input
                placeholder='변경 비밀번호를 입력하세요.'
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
            </div>
          </div>
          <div className='flex w-full items-center justify-center gap-3'>
            <div className='w-40'>
              <NutritionDate>변경 비밀번호 확인</NutritionDate>
            </div>
            <div className='w-1/3'>
              <Input
                placeholder='변경 비밀번호를 다시 입력하세요.'
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />
            </div>
          </div>
          <div className='flex w-1/3 justify-center gap-5'>
            <Button width='full'>변경</Button>
            <Button
              variant='secondary'
              width='full'
              onClick={() => setIsOpenPasswordChange(false)}
            >
              취소
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MyPage;
