'use client';

import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from '@/schema/authSchema';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import {
  BodyGray,
  CardTitle,
  NutritionDate,
  NutritionEtc,
} from '@/components/common/Typography';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { PLAN_DATA } from '@/constants/_getAllList/_planData';
import { SURVEY_DATA } from '@/constants/_getAllList/_surveyData';
import { NAV_LINKS } from '@/constants/_navbar';
import { SUCCESS } from '@/constants/_toastMessage';
import { useModalStore } from '@/stores/modalStore';
import { useToastStore } from '@/stores/useToastStore';

const imageInfo = {
  size: 110,
  src: '/imgs/pi-gon-ping.jpg',
};

const userData = {
  name: '내 이름',
  email: 'test123@naver.com',
  mealPlan: 3,
  survey: 3,
};

const MyPage = () => {
  const { openModal, closeModal } = useModalStore();
  const showToast = useToastStore((state) => state.showToast);

  // 아래 변수는 현재 비밀번호확인 api 동작시 success로 대체예정
  const isSuccessConfirm = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const currentPassword = watch('currentPassword');

  const handleCheckPassword = () => {
    // 현재 비밀번호 확인하는 POST 메서드 실행할 함수
    console.log(currentPassword, '비밀번호 확인 요청');
  };

  const submitChangePassword = (data: {
    newPassword: string;
    newPasswordConfirm: string;
  }) => {
    // 변경 버튼 클릭시 PATCH 메서드 성공시 실행할 함수
    console.log(data);
    showToast(SUCCESS.changePassword, 'success', 3000);
    closeModal();
  };

  return (
    <>
      <Modal>
        <form onSubmit={handleSubmit(submitChangePassword)} className='w-full'>
          <fieldset className='flex w-full justify-center'>
            <legend className='sr-only'>비밀번호 변경</legend>
            <div className='flex w-full flex-col items-center gap-6 rounded bg-white-100 p-12'>
              <div className='flex w-full flex-col gap-2'>
                <label
                  htmlFor='currentPassword'
                  className='text-sm font-semibold'
                >
                  현재 비밀번호
                </label>
                <Input
                  type='password'
                  placeholder='현재 비밀번호를 입력해주세요.'
                  id='currentPassword'
                  height='basic'
                  className='text-green-500 placeholder:text-green-400'
                  value={currentPassword}
                  includeButton
                  buttonText='확인'
                  onSubmit={handleCheckPassword}
                  {...register('currentPassword')}
                />
              </div>
              <div className='flex w-full flex-col gap-2'>
                <label htmlFor='newPassword' className='text-sm font-semibold'>
                  변경 비밀번호
                </label>
                <Input
                  type='password'
                  placeholder='변경할 비밀번호를 입력해주세요.'
                  id='newPassword'
                  height='basic'
                  className='text-green-500 placeholder:text-green-400'
                  disabled={!isSuccessConfirm}
                  {...register('newPassword')}
                />
                {errors.newPassword && (
                  <span className='text-xs text-red-300'>
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
              <div className='flex w-full flex-col gap-2'>
                <label
                  htmlFor='newPasswordConfirm'
                  className='text-sm font-semibold'
                >
                  변경 비밀번호 확인
                </label>
                <Input
                  type='password'
                  placeholder='변경할 비밀번호를 다시 입력해주세요.'
                  id='newPasswordConfirm'
                  height='basic'
                  className='text-green-500 placeholder:text-green-400'
                  disabled={!isSuccessConfirm}
                  {...register('newPasswordConfirm')}
                />
                {errors.newPasswordConfirm && (
                  <span className='text-xs text-red-300'>
                    {errors.newPasswordConfirm.message}
                  </span>
                )}
              </div>
              <div className='flex w-1/2 gap-4'>
                <Button
                  size='small'
                  width='full'
                  type='submit'
                  disabled={
                    !isSuccessConfirm ||
                    !!errors.newPassword ||
                    !!errors.newPasswordConfirm
                  }
                >
                  변경
                </Button>
                <Button
                  size='small'
                  variant='secondary'
                  width='full'
                  type='button'
                  onClick={closeModal}
                >
                  취소
                </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </Modal>
      <div className='flex flex-col'>
        <div className='mb-10 flex w-full'>
          <div className='flex w-full items-center gap-4 border-r-2 border-gray-200 border-opacity-50 px-16'>
            <Image
              src={imageInfo.src}
              width={imageInfo.size}
              height={imageInfo.size}
              alt='유저 이미지'
              className='rounded-full'
            />
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <CardTitle>{userData.name}</CardTitle> 님 안녕하세요.
              </div>
              <BodyGray>{userData.email}</BodyGray>
            </div>
            <div className='flex flex-1 justify-end'>
              <Button onClick={openModal} width='fit' size='small'>
                비밀번호 변경
              </Button>
            </div>
          </div>
          <div className='flex w-1/3 flex-col items-center justify-center gap-2 border-r-2 border-gray-200 border-opacity-50 px-6'>
            <NutritionEtc>내가 작성한 식단</NutritionEtc>
            <Link
              href={NAV_LINKS[3].href}
              className='text-3xl font-semibold text-green-400 underline'
            >
              {userData.mealPlan}
            </Link>
          </div>
          <div className='flex w-1/3 flex-col items-center justify-center gap-2 px-6'>
            <NutritionEtc>내가 생성한 설문</NutritionEtc>
            <Link
              href={NAV_LINKS[4].href}
              className='text-3xl font-semibold text-green-400 underline'
            >
              {userData.survey}
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-end justify-between'>
              <CardTitle>최근 작성한 식단</CardTitle>
              <Link
                href={NAV_LINKS[3].href}
                hidden={userData.mealPlan === 0}
                className='text-xs text-gray-500'
              >
                더보기
              </Link>
            </div>
            {userData.mealPlan === 0 ? (
              <div className='mt-1 flex justify-center'>
                <NutritionDate>최근 작성한 식단이 없습니다.</NutritionDate>
              </div>
            ) : (
              <GetAllListTable data={PLAN_DATA.slice(0, 3)} />
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-end justify-between'>
              <CardTitle>최근 생성한 설문</CardTitle>
              <Link
                href={NAV_LINKS[4].href}
                hidden={userData.survey === 0}
                className='text-xs text-gray-500'
              >
                더보기
              </Link>
            </div>
            {userData.survey === 0 ? (
              <div className='mt-1 flex justify-center'>
                <NutritionDate>최근 생성한 설문이 없습니다.</NutritionDate>
              </div>
            ) : (
              <GetAllListTable data={SURVEY_DATA.slice(0, 3)} />
            )}
          </div>
          <button className='flex justify-end text-xs text-gray-400 underline opacity-50'>
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPage;
