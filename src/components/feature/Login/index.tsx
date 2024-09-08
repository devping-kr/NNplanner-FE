'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/schema/authSchema';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import {
  AuthTitle,
  BodyGray,
  BodyPrimary,
} from '@/components/common/Typography';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: { email: string; password: string }) => {
    // TODO: auth api 배포후 작성예정
    console.log(data);
  };
  return (
    <main className='mx-auto my-0 flex overflow-hidden'>
      <section className='relative flex w-full flex-col gap-10 bg-green-100 pl-36 pt-48'>
        <div className='flex flex-col gap-2'>
          <AuthTitle>Login In to</AuthTitle>
          <BodyPrimary>냠냠 플래너</BodyPrimary>
        </div>
        <div className='flex flex-col gap-2'>
          <BodyGray>{`If you haven't registered yet, please click the link to sign up.`}</BodyGray>
          <div className='flex items-center gap-4'>
            <BodyGray>you can</BodyGray>
            <Link href={'/join'} className='w-fit font-bold text-green-600'>
              join here!
            </Link>
          </div>
          <Image
            className='absolute bottom-0 right-5'
            src={'/imgs/login.png'}
            alt='로그인 이미지'
            width={340}
            height={450}
          />
        </div>
      </section>
      <div className='w- h-full bg-gradient-to-b from-green-100 to-transparent'></div>
      <section className='flex h-screen w-1/2 flex-col items-center justify-center gap-10'>
        <Link href='#'>
          <Image
            src={'/imgs/navbar-logo.png'}
            alt='로고이미지'
            width={180}
            height={42}
          />
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col gap-5 px-6'
        >
          <div>
            <Input
              type='text'
              placeholder='이메일을 입력해주세요'
              height='large'
              className='text-green-500 placeholder:text-green-400'
              {...register('email')}
            />
            {errors.email && (
              <span className='text-red-300'>{errors.email.message}</span>
            )}
          </div>
          <div>
            <Input
              type={isShowPassword ? 'text' : 'password'}
              placeholder='비밀번호를 입력해주세요'
              height='large'
              className='text-green-500 placeholder:text-green-400'
              isRightIcon={true}
              rightIcon={isShowPassword ? 'show' : 'hide'}
              rightIconAction={() => setIsShowPassword(!isShowPassword)}
              {...register('password')}
            />
            {errors.password && (
              <span className='text-red-300'>{errors.password.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <Button type='submit' size='basic' className='shadow-lg'>
              로그인
            </Button>
            <Button type='submit' size='basic' className='shadow-lg'>
              구글 로그인
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
