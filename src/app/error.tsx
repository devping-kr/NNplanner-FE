'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import CarrotAnimation from '../../public/animations/carrot.json';
import {
  Body1Black,
  SubTitle1Black,
  Subtitle1White,
} from '@/components/common/Typography';

/**
 * @description 500 에러 페이지
 */
const Error = () => {
  const router = useRouter();

  return (
    <div className='relative flex h-screen flex-col items-center justify-center'>
      <header className='absolute top-0 h-20 w-full border-b border-b-grey-100 bg-white-100 px-6 py-4'>
        <Link href={'/'}>
          <Image
            src={'/imgs/header-logo.png'}
            width={66}
            height={48}
            alt='header logo'
          />
        </Link>
      </header>
      <div className='flex h-screen w-full items-center justify-center gap-[180px] bg-grey-50'>
        <div className='mb-20 flex h-[480px] w-[480px] items-center'>
          <Lottie animationData={CarrotAnimation} loop autoplay />
        </div>
        <div className='flex flex-col justify-between gap-14'>
          <Image
            src={'/svgs/error/500.svg'}
            width={640}
            height={88}
            alt='404 error typo'
          />

          <p>
            <Body1Black>서버에 문제가 발생했습니다.</Body1Black>
            <br />
            <Body1Black>잠시 후 다시 시도해 주세요.</Body1Black>
            <br />
          </p>

          <div className='flex gap-8'>
            <Link href={'/'}>
              <button className='h-16 rounded-lg bg-green-500 px-6 hover:bg-green-600 active:bg-green-700'>
                <Subtitle1White>홈으로</Subtitle1White>
              </button>
            </Link>
            <button
              className='flex h-16 items-center gap-2 rounded-lg px-4 hover:bg-grey-100'
              onClick={() => router.back()}
            >
              <Image
                src={'/svgs/error/arrow-left.svg'}
                width={24}
                height={24}
                alt='arrow-left'
              />
              <SubTitle1Black>뒤로 가기</SubTitle1Black>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
