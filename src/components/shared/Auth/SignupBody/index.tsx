'use client';

import { ChangeEvent, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '@/schema/authSchema';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import { useToastStore } from '@/stores/useToastStore';

const SignupBody = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [verification, setVerification] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
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

  const onSubmit = (data: {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
  }) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <fieldset className='flex w-full flex-col gap-5 px-6'>
        <legend className='sr-only'>회원가입 인증</legend>
        <div className='flex gap-3'>
          <div className='flex w-full flex-col'>
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
          <Button
            size='small'
            type='button'
            className='w-1/3'
            onClick={handleEmailVerification}
            disabled={!email || !!errors.email}
          >
            인증번호 받기
          </Button>
        </div>
        {showVerificationInput && (
          <div className='flex gap-3'>
            <div className='w-full'>
              <Input
                type='text'
                placeholder='인증번호를 입력해주세요'
                height='large'
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

        <div>
          <Input
            type='text'
            placeholder='이름을 입력해주세요'
            height='large'
            className='text-green-500 placeholder:text-green-400'
            {...register('name')}
          />
          {errors.name && (
            <span className='text-red-300'>{errors.name.message}</span>
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
        <div>
          <Input
            type={isShowPasswordConfirm ? 'text' : 'password'}
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
  );
};

export default SignupBody;
