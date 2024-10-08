'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema } from '@/schema/authSchema';
import { LoginRequest } from '@/type/auth/authRequest';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { AUTH_LINKS } from '@/constants/_auth';
import { usePostLogin } from '@/hooks/auth/usePostLogin';
import { useAuth } from '@/hooks/useAuth';

const LoginBody = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { mutate: loginMutate, isSuccess: loginSuccess } = usePostLogin();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      loginType: 'LOCAL',
    },
  });

  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    try {
      loginMutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      login();
    }
  }, [loginSuccess]);

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
              <span className='text-xs text-red-300'>
                {errors.email.message}
              </span>
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
              <span className='text-xs text-red-300'>
                {errors.password.message}
              </span>
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
          onClick={() => router.push(AUTH_LINKS.signup)}
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
