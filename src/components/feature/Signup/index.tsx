'use client';

import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import {
  H1Black,
  H1White,
  H4White,
  SubTitle3White,
} from '@/components/common/Typography';
import SignupBody from '@/components/shared/Auth/SignupBody';

const Signup = () => {
  return (
    <main className='mx-auto my-0 flex overflow-hidden'>
      <section className="relative h-screen w-full bg-green-500 bg-[url('/imgs/auth.png')] bg-cover bg-center">
        <div className='absolute inset-0 z-10 animate-gradient bg-gradient-to-bl from-transparent to-black-100/60 bg-[400%,400%]'></div>
        <div className='absolute z-50 flex h-screen flex-col items-start justify-between p-20'>
          <Image
            src='/imgs/white-logo.png'
            width={77}
            height={56}
            alt='white logo'
          />
          <div className='flex flex-col gap-4'>
            <H4White>학교·병원 영양사들을 위한</H4White>
            <div className='flex flex-col'>
              <H1White>ALL IN ONE</H1White>
              <H1White>식단 관리 서비스, 냠냠플래너</H1White>
            </div>
          </div>
          <Link href='/' target='_blank' className='flex items-center gap-4'>
            <SubTitle3White>홈페이지 보기</SubTitle3White>
            <Icon name='arrowRight' width={24} height={24} color='white' />
          </Link>
        </div>
      </section>
      <section className='flex h-screen min-w-[608px] flex-col items-center justify-center gap-6 px-16'>
        <H1Black>회원가입</H1Black>
        <SignupBody />
      </section>
    </main>
  );
};

export default Signup;
