'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUpSchema } from '@/schema/authSchema';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { usePostSignup, UserRequest } from '@/hooks/auth/usePostSignup';
import { useToastStore } from '@/stores/useToastStore';

const SignupBody = () => {
  const router = useRouter();
  const { mutate: signupMutate, isSuccess } = usePostSignup();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [verification, setVerification] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRequest>({
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

  const showToast = useToastStore((state) => state.showToast);

  // TODO: 인증번호 요청 api 성공시 해당 함수 실행하도록 바꿔줘야함
  const handleEmailVerification = () => {
    if (!errors.email) {
      setShowVerificationInput(true);
      showToast(
        '인증번호가 이메일로 전송되었습니다. 이메일을 확인해주세요.',
        'success',
        1000,
      );
    }
  };

  const onSubmit: SubmitHandler<UserRequest> = (data) => {
    signupMutate(data);
    isSuccess && console.log('회원가입 성공');
  };

  return (
    <div className='flex w-full flex-col gap-3'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex w-full flex-col gap-8'>
          <legend className='sr-only'>회원가입 인증</legend>
          <div className='flex gap-3'>
            <div className='relative w-full'>
              <label
                htmlFor='email'
                className='absolute left-0 top-[-24px] font-semibold text-green-800'
              >
                이메일
              </label>
              <Input
                type='text'
                placeholder='이메일을 입력해주세요'
                id='email'
                height='large'
                className='text-green-500 placeholder:text-green-400'
                {...register('email')}
              />
              {errors.email && (
                <span className='text-red-300'>{errors.email.message}</span>
              )}
            </div>
            <Button
              size='small'
              type='button'
              className='h-auto w-1/3'
              onClick={handleEmailVerification}
              disabled={!email || !!errors.email}
            >
              인증번호 받기
            </Button>
          </div>
          {showVerificationInput && (
            <div className='flex gap-3'>
              <div className='relative w-full'>
                <label
                  htmlFor='verification'
                  className='absolute left-0 top-[-24px] font-semibold text-green-800'
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
                  className='text-green-500 placeholder:text-xs placeholder:text-green-400'
                />
              </div>
              <Button size='small' type='button' className='flex w-1/3'>
                인증
              </Button>
            </div>
          )}
          <div className='relative'>
            <label
              htmlFor='name'
              className='absolute left-0 top-[-24px] font-semibold text-green-800'
            >
              이름
            </label>
            <Input
              type='text'
              id='name'
              placeholder='이름을 입력해주세요'
              height='large'
              className='text-green-500 placeholder:text-green-400'
              {...register('username')}
            />
            {errors.username && (
              <span className='text-red-300'>{errors.username.message}</span>
            )}
          </div>
          <div className='relative'>
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
          <div className='relative'>
            <label
              htmlFor='passwordConfirm'
              className='absolute left-0 top-[-24px] font-semibold text-green-800'
            >
              비밀번호 확인
            </label>
            <Input
              type={isShowPasswordConfirm ? 'text' : 'password'}
              id='passwordConfirm'
              placeholder='비밀번호를 다시 입력해주세요'
              height='large'
              className='text-green-500 placeholder:text-green-400'
              isRightIcon={true}
              rightIcon={isShowPasswordConfirm ? 'show' : 'hide'}
              rightIconAction={() =>
                setIsShowPasswordConfirm(!isShowPasswordConfirm)
              }
              {...register('passwordConfirm')}
            />
            {errors.passwordConfirm && (
              <span className='text-red-300'>
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>
          <div className='flex w-full flex-col gap-2'>
            <Button type='submit' size='basic' className='shadow-lg'>
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
          onClick={() => router.push('/login')}
          className='cursor-pointer font-semibold text-green-700'
        >
          여기서
        </span>{' '}
        로그인하세요
      </span>
    </div>
  );
};

export default SignupBody;
