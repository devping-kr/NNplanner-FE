'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/schema/authSchema';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';

const LoginBody = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <fieldset className='flex w-full flex-col gap-5 px-6'>
        <legend className='sr-only'>로그인 인증</legend>
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
  );
};

export default LoginBody;
