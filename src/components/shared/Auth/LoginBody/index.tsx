'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { env } from '@/lib/env';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginSchema } from '@/schema/authSchema';
import { LoginRequest } from '@/type/auth/authRequest';
import { saveTokens } from '@/utils/saveTokens';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import {
  Caption1Red500,
  H4Black,
  Label1Black,
  Subtitle1White,
  Subtitle2Black,
} from '@/components/common/Typography';
import { BASE_ROUTES } from '@/constants/_navbar';
import { usePostGoogleLogin } from '@/hooks/auth/usePostGoogleLogin';
import { usePostLogin } from '@/hooks/auth/usePostLogin';
import { useAuth } from '@/hooks/useAuth';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';
import { useUserStore } from '@/stores/useUserStore';

const LoginBody = () => {
  const { navigate } = useNavigate();
  const { login } = useAuth();
  const searchParams = useSearchParams();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const showToast = useToastStore((set) => set.showToast);
  const setUserInfo = useUserStore((set) => set.setUserInfo);

  const { mutate: loginMutate } = usePostLogin();
  const { mutate: googleLoginMutate } = usePostGoogleLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
        showToast(`${error.message} 로그인 실패`, 'warning', 1000);
      },
    });
  };

  const googleLoginHandler = () => {
    navigate(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.GOOGLE_CLIENT_ID}&redirect_uri=${env.GOOGLE_REDIRECT_URL}&response_type=code&scope=email%20profile%20openid&access_type=offline`,
    );
  };

  useEffect(() => {
    const authCode = searchParams.get('code');
    if (authCode) {
      googleLoginMutate(
        { authCode: authCode || '' },
        {
          onSuccess: (data) => {
            const { username, userId, email } = data.data;
            setUserInfo(username, userId, email);
            login();
            saveTokens({
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
            });
          },
          onError: () => {
            showToast('구글 로그인 실패', 'warning', 1000);
          },
        },
      );
    }
  }, [searchParams]);

  return (
    <div className='flex w-[480px] flex-col items-center gap-10'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <fieldset className='flex w-full flex-col gap-6'>
          <legend className='sr-only'>로그인 인증</legend>
          <div className='flex w-full flex-col gap-2'>
            <Label1Black htmlFor='email'>이메일</Label1Black>
            <div className='h-16'>
              <Input
                type='text'
                id='email'
                placeholder='이메일을 입력해 주세요.'
                size='m'
                variant='grey50'
                {...register('email')}
              />
            </div>
            {errors.email && (
              <Caption1Red500>{errors.email.message}</Caption1Red500>
            )}
          </div>
          <div className='flex w-full flex-col gap-2'>
            <Label1Black htmlFor='password'>비밀번호</Label1Black>
            <div className='h-16'>
              <Input
                type={isShowPassword ? 'text' : 'password'}
                id='password'
                placeholder='비밀번호를 입력해 주세요.'
                size='m'
                variant='grey50'
                isRightIcon={true}
                rightIcon={!isShowPassword ? 'show' : 'hide'}
                rightIconAction={() => setIsShowPassword(!isShowPassword)}
                {...register('password')}
              />
            </div>
            {errors.password && (
              <Caption1Red500>{errors.password.message}</Caption1Red500>
            )}
          </div>
          <div className='w-full border-b border-grey-100'>
            <Button
              type='submit'
              size='lg'
              width='full'
              variant='primary'
              disabled={
                watch('email').length === 0 || watch('password').length === 0
              }
              className='my-10'
            >
              <Subtitle1White>로그인</Subtitle1White>
            </Button>
          </div>
          <div className='flex w-full flex-col items-center gap-6'>
            <H4Black>회원가입</H4Black>
            <div className='flex w-full flex-col gap-4'>
              <Button
                onClick={() => navigate(BASE_ROUTES.SIGNUP)}
                variant='soft'
                className='flex items-center justify-between px-4'
                width='full'
                size='md'
              >
                <Icon name='envelope' width={24} height={24} color='black' />
                <Subtitle2Black>이메일로 시작하기</Subtitle2Black>
                <div />
              </Button>
              <Button
                className='flex items-center justify-between px-4'
                width='full'
                size='md'
                variant='outline'
                onClick={() => googleLoginHandler()}
              >
                <Icon name='google' width={24} height={24} />
                <Subtitle2Black>구글로 시작하기</Subtitle2Black>
                <div />
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginBody;
