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
import {
  Body2Black,
  Body2Green500,
  Caption1Red500,
  Label1Black,
  Subtitle1White,
} from '@/components/common/Typography';
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
    <div className='flex w-[480px] flex-col items-center gap-10'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <fieldset className='flex w-full flex-col gap-6'>
          <legend className='sr-only'>회원가입 인증</legend>
          <div className='flex w-full flex-col gap-2'>
            <Label1Black htmlFor='email'>이메일</Label1Black>
            <div className='flex h-16 gap-3'>
              <Input
                type='text'
                placeholder='이메일을 입력해주세요'
                disabled={sendSuccess}
                id='email'
                size='m'
                variant='grey50'
                {...register('email')}
              />
              <Button
                variant='teritary'
                size='lg'
                type='button'
                className='min-w-[100px]'
                onClick={handleEmailVerification}
                disabled={!email || !!errors.email || confirmSuccess}
              >
                <Subtitle1White>인증하기</Subtitle1White>
              </Button>
            </div>
            {errors.email && (
              <Caption1Red500>{errors.email.message}</Caption1Red500>
            )}
          </div>
          {showVerificationInput && (
            <div className='flex w-full flex-col gap-2'>
              <Label1Black htmlFor='verification'>인증번호</Label1Black>
              <div className='flex h-16 gap-3'>
                <Input
                  type='text'
                  id='verification'
                  placeholder='인증번호를 입력해주세요.'
                  size='m'
                  variant='grey50'
                  value={verification}
                  onChange={handleVerification}
                  disabled={confirmSuccess}
                />
                <Button
                  size='lg'
                  variant='teritary'
                  type='button'
                  className='min-w-[100px]'
                  onClick={handleEmailVerifyConfirm}
                  disabled={confirmSuccess || verification.length === 0}
                >
                  <Subtitle1White>확인</Subtitle1White>
                </Button>
              </div>
            </div>
          )}
          <div className='flex w-full flex-col gap-2'>
            <Label1Black htmlFor='name'>이름</Label1Black>
            <div className='h-16'>
              <Input
                type='text'
                id='name'
                placeholder='이름을 입력해 주세요.'
                size='m'
                variant='grey50'
                {...register('username')}
              />
            </div>
            {errors.username && (
              <Caption1Red500>{errors.username.message}</Caption1Red500>
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
          <div className='flex w-full flex-col gap-2'>
            <Label1Black htmlFor='passwordConfirm'>비밀번호 확인</Label1Black>
            <div className='h-16'>
              <Input
                type={isShowPasswordConfirm ? 'text' : 'password'}
                id='passwordConfirm'
                placeholder='비밀번호를 다시 입력해 주세요.'
                size='m'
                variant='grey50'
                isRightIcon={true}
                rightIcon={!isShowPasswordConfirm ? 'show' : 'hide'}
                rightIconAction={() =>
                  setIsShowPasswordConfirm(!isShowPasswordConfirm)
                }
                {...register('passwordConfirm')}
              />
            </div>
            {errors.passwordConfirm && (
              <Caption1Red500>{errors.passwordConfirm.message}</Caption1Red500>
            )}
          </div>
          <div className='mt-4 w-full'>
            <Button
              type='submit'
              size='lg'
              disabled={!confirmSuccess}
              variant='primary'
              width='full'
            >
              <Subtitle1White>회원가입</Subtitle1White>
            </Button>
            {/* OAuth 개발 후 적용예정 */}
            {/* <Button type='submit' size='basic' className='shadow-lg'>
              구글 회원가입
            </Button> */}
          </div>
        </fieldset>
      </form>

      <Body2Black>
        이미 계정이 있나요? 여기서{' '}
        <Body2Green500
          onClick={() => router.push(AUTH_LINKS.login)}
          className='cursor-pointer'
        >
          로그인
        </Body2Green500>
        하세요.
      </Body2Black>
    </div>
  );
};

export default SignupBody;
