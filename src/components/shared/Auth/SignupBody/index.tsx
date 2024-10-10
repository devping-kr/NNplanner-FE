'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUpSchema } from '@/schema/authSchema';
import { SignupRequest } from '@/type/auth/authRequest';
import { FailResponse, Result } from '@/type/response';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { AUTH_LINKS } from '@/constants/_auth';
import { usePostSignup } from '@/hooks/auth/usePostSignup';
import { usePostVerifyConfirm } from '@/hooks/auth/usePostVerifyConfirm';
import { usePostVerifySend } from '@/hooks/auth/usePostVerifySend';
import { useToastStore } from '@/stores/useToastStore';

const SignupBody = () => {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const { mutate: signupMutate } = usePostSignup();
  const { mutate: verifySendMutate, isSuccess: sendSuccess } =
    usePostVerifySend();
  const { mutate: verifyConfirmMutate, isSuccess: confirmSuccess } =
    usePostVerifyConfirm();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [verification, setVerification] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupRequest>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      loginType: 'LOCAL',
    },
  });

  const email = watch('email');

  const handleVerification = (e: ChangeEvent<HTMLInputElement>) => {
    setVerification(e.target.value);
  };

  const handleEmailVerification = () => {
    if (!errors.email) {
      verifySendMutate(
        { email: email },
        {
          onSuccess: ({ message }: Result<null>) => {
            showToast(message, 'success', 1000);
          },
          onError: (error: AxiosError<FailResponse>) => {
            const errorMessage =
              error.response?.data?.message || '인증 요청 실패';
            showToast(errorMessage, 'warning', 1000);
          },
        },
      );
    }
  };

  const handleEmailVerifyConfirm = () => {
    verifyConfirmMutate(
      { email: email, verifyCode: verification },
      {
        onSuccess: ({ message }: Result<null>) => {
          showToast(message, 'success', 1000);
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error.response?.data?.message || '이메일 인증 실패';
          showToast(errorMessage, 'warning', 1000);
        },
      },
    );
  };

  const onSubmit: SubmitHandler<SignupRequest> = (data) => {
    signupMutate(data, {
      onSuccess: ({ message }: Result<null>) => {
        router.push(AUTH_LINKS.login);
        showToast(message, 'success', 1000);
      },
      onError: (error: AxiosError<FailResponse>) => {
        const errorMessage = error.response?.data?.message || '회원가입 실패';
        showToast(errorMessage, 'warning', 1000);
      },
    });
  };

  useEffect(() => {
    if (sendSuccess) {
      setShowVerificationInput(true);
    }
  }, [sendSuccess]);

  return (
    <div className='flex w-full flex-col gap-3'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex w-full flex-col gap-8'>
          <legend className='sr-only'>회원가입 인증</legend>
          <div className='flex gap-3'>
            <div className='relative w-full'>
              <label
                htmlFor='email'
                className='absolute left-0 top-[-24px] text-sm font-semibold text-green-800'
              >
                이메일
              </label>
              <div className='flex gap-3'>
                <Input
                  type='text'
                  placeholder='이메일을 입력해주세요'
                  disabled={sendSuccess}
                  id='email'
                  height='basic'
                  className='text-green-500 placeholder:text-green-400'
                  {...register('email')}
                />
                <Button
                  size='small'
                  type='button'
                  className='h-auto w-1/3'
                  onClick={handleEmailVerification}
                  disabled={!email || !!errors.email || confirmSuccess}
                >
                  인증번호 받기
                </Button>
              </div>
              {errors.email && (
                <span className='text-xs text-red-300'>
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          {showVerificationInput && (
            <div className='flex gap-3'>
              <div className='relative w-full'>
                <label
                  htmlFor='verification'
                  className='absolute left-0 top-[-24px] text-sm font-semibold text-green-800'
                >
                  인증번호
                </label>
                <Input
                  type='text'
                  id='verification'
                  placeholder='인증번호를 입력해주세요'
                  height='basic'
                  value={verification}
                  onChange={handleVerification}
                  disabled={confirmSuccess}
                  className='text-green-500 placeholder:text-xs placeholder:text-green-400'
                />
              </div>
              <Button
                size='small'
                type='button'
                className='flex w-1/3'
                onClick={handleEmailVerifyConfirm}
                disabled={confirmSuccess}
              >
                인증
              </Button>
            </div>
          )}
          <div className='relative'>
            <label
              htmlFor='name'
              className='absolute left-0 top-[-24px] text-sm font-semibold text-green-800'
            >
              이름
            </label>
            <Input
              type='text'
              id='name'
              placeholder='이름을 입력해주세요'
              height='basic'
              className='text-green-500 placeholder:text-green-400'
              {...register('username')}
            />
            {errors.username && (
              <span className='text-xs text-red-300'>
                {errors.username.message}
              </span>
            )}
          </div>
          <div className='relative'>
            <label
              htmlFor='password'
              className='absolute left-0 top-[-24px] text-sm font-semibold text-green-800'
            >
              비밀번호
            </label>
            <Input
              type={isShowPassword ? 'text' : 'password'}
              id='password'
              placeholder='비밀번호를 입력해주세요'
              height='basic'
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
          <div className='relative'>
            <label
              htmlFor='passwordConfirm'
              className='absolute left-0 top-[-24px] text-sm font-semibold text-green-800'
            >
              비밀번호 확인
            </label>
            <Input
              type={isShowPasswordConfirm ? 'text' : 'password'}
              id='passwordConfirm'
              placeholder='비밀번호를 다시 입력해주세요'
              height='basic'
              className='text-green-500 placeholder:text-green-400'
              isRightIcon={true}
              rightIcon={isShowPasswordConfirm ? 'show' : 'hide'}
              rightIconAction={() =>
                setIsShowPasswordConfirm(!isShowPasswordConfirm)
              }
              {...register('passwordConfirm')}
            />
            {errors.passwordConfirm && (
              <span className='text-xs text-red-300'>
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>
          <div className='flex w-full flex-col gap-2'>
            <Button
              type='submit'
              size='basic'
              className='shadow-lg'
              disabled={!confirmSuccess}
            >
              회원가입
            </Button>
            <Button type='submit' size='basic' className='shadow-lg'>
              구글 회원가입
            </Button>
          </div>
        </fieldset>
      </form>
      <span className='text-center'>
        이미 계정이 있다면{' '}
        <span
          onClick={() => router.push(AUTH_LINKS.login)}
          className='cursor-pointer font-semibold text-green-700 hover:text-green-800'
        >
          여기서
        </span>{' '}
        로그인하세요
      </span>
    </div>
  );
};

export default SignupBody;
