'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/schema/authSchema';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';

const LoginBody = () => {
  const router = useRouter();
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
    <div className='flex w-full flex-col gap-3'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex w-full flex-col gap-8'>
          <legend className='sr-only'>로그인 인증</legend>
          <div className='relative w-full'>
            <label
              htmlFor='email'
              className='absolute left-0 top-[-24px] font-semibold text-green-800'
            >
              이메일
            </label>
            <Input
              type='text'
              id='email'
              placeholder='이메일을 입력해주세요'
              height='large'
              className='text-green-500 placeholder:text-green-400'
              {...register('email')}
            />
            {errors.email && (
              <span className='text-red-300'>{errors.email.message}</span>
            )}
          </div>
          <div className='relative w-full'>
            <label
              htmlFor='password'
              className='absolute left-0 top-[-24px] font-semibold text-green-800'
            >
              비밀번호
            </label>
            <Input
              type={isShowPassword ? 'text' : 'password'}
              id='password'
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
          <div className='flex w-full flex-col gap-2'>
            <Button type='submit' size='basic' className='shadow-lg'>
              로그인
            </Button>
            <Button type='submit' size='basic' className='shadow-lg'>
              구글 로그인
            </Button>
          </div>
        </fieldset>
      </form>
      <span className='text-center'>
        아직 계정이 없다면{' '}
        <span
          onClick={() => router.push('/signup')}
          className='cursor-pointer font-semibold text-green-700'
        >
          여기서
        </span>{' '}
        회원가입하세요
      </span>
    </div>
  );
};

export default LoginBody;
