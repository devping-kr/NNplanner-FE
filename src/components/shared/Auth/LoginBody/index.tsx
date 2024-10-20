'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema } from '@/schema/authSchema';
import { LoginRequest } from '@/type/auth/authRequest';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { BASE_ROUTES } from '@/constants/_navbar';
import { usePostLogin } from '@/hooks/auth/usePostLogin';
import { useAuth } from '@/hooks/useAuth';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';
import { useUserStore } from '@/stores/useUserStore';

const LoginBody = () => {
  const { navigate } = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { mutate: loginMutate } = usePostLogin();
  const { login } = useAuth();
  const showToast = useToastStore((set) => set.showToast);
  const setUserInfo = useUserStore((set) => set.setUserInfo);

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
    loginMutate(data, {
      onSuccess: (data) => {
        const { username, userId, email } = data.data;
        setUserInfo(username, userId, email);
        login();
      },
      onError: (error) => {
        error.message;
        showToast(`${error.message} 로그인 실패`, 'warning', 1000);
      },
    });
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
          onClick={() => navigate(BASE_ROUTES.SIGNUP)}
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
