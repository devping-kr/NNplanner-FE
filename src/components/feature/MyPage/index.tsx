'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from '@/schema/authSchema';
import { MenuResponseDTO } from '@/type/menu/menuResponse';
import { FailResponse, Result } from '@/type/response';
import { surveyType } from '@/type/survey/surveyResponse';
import Button from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { TableRowData } from '@/components/common/Table';
import {
  BodyGray,
  CardTitle,
  NutritionDate,
  NutritionEtc,
} from '@/components/common/Typography';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { NAV_LINKS } from '@/constants/_navbar';
import { useGetMealList } from '@/hooks/meal/useGetMealList';
import { useGetMenuCount } from '@/hooks/menu/useGetMenuCount';
import { useGetSurveyList } from '@/hooks/survey/useGetSurveyList';
import { usePostCheckPw } from '@/hooks/user/usePostCheckPw';
import { usePostEditPw } from '@/hooks/user/usePostEditPw';
import { useModalStore } from '@/stores/modalStore';
import { useToastStore } from '@/stores/useToastStore';
import { useUserStore } from '@/stores/useUserStore';

const imageInfo = {
  size: 110,
  src: '/imgs/pi-gon-ping.jpg',
};

const LIST_SIZE = 3;

const MyPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { openModal, closeModal } = useModalStore();
  const showToast = useToastStore((state) => state.showToast);
  const { username, email } = useUserStore((state) => ({
    username: state.username,
    email: state.email,
  }));

  const { mutate: checkPwMutate, isSuccess: isCheckPwSuccess } =
    usePostCheckPw();
  const { mutate: editPwMutate } = usePostEditPw();
  const { data: surveyList, isSuccess } = useGetSurveyList({
    pageSize: LIST_SIZE,
  });
  const surveyTotalItems = isSuccess ? surveyList!.data.totalItems : 0;
  const { data: mealList } = useGetMealList({
    page: 0,
    sort: 'createdAt,desc',
    size: LIST_SIZE,
  });
  const { data: mealListTotalItems } = useGetMenuCount();
  const mealTotalItems = isSuccess
    ? mealListTotalItems!.data.totalMenuCount
    : 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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
    checkPwMutate(
      { password: currentPassword },
      {
        onSuccess: ({ message }: Result<null>) => {
          showToast(message, 'success', 1000);
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error?.response?.data?.message || '비밀번호 불일치';
          showToast(errorMessage, 'warning', 1000);
        },
      },
    );
  };

  const resetInputs = () => {
    setValue('currentPassword', '');
    setValue('newPassword', '');
    setValue('newPasswordConfirm', '');
  };

  const submitChangePassword = (data: {
    newPassword: string;
    newPasswordConfirm: string;
  }) => {
    editPwMutate(
      { password: data.newPassword },
      {
        onSuccess: ({ message }: Result<null>) => {
          showToast(message, 'success', 3000);
          closeModal();
          resetInputs();
        },
        onError: (error: AxiosError<FailResponse>) => {
          const errorMessage =
            error?.response?.data?.message || '비밀번호 변경 실패';
          showToast(errorMessage, 'warning', 1000);
          resetInputs();
        },
      },
    );
  };

  const convertToTableRowData = (menus: MenuResponseDTO[]): TableRowData[] => {
    return menus.map((menu) => ({
      식단ID: menu.monthMenuId.substring(0, 4),
      식단이름: menu.monthMenuName,
      대분류: menu.majorCategory,
      소분류: menu.minorCategory,
      생성일: dayjs(menu.createAt).format('YYYY-MM-DD'),
    }));
  };

  const surveyConvertToTableRowData = (
    surveys: surveyType[],
  ): TableRowData[] => {
    return surveys.map((survey) => ({
      설문ID: survey.surveyId,
      설문이름: survey.surveyName,
      생성일: survey.createdAt,
      상태: survey.state,
    }));
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
                  disabled={!isCheckPwSuccess}
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
                  disabled={!isCheckPwSuccess}
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
                    !isCheckPwSuccess ||
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
                <CardTitle>{isMounted ? username : ''}</CardTitle> 님
                안녕하세요.
              </div>
              <BodyGray>{email}</BodyGray>
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
              {mealTotalItems}
            </Link>
          </div>
          <div className='flex w-1/3 flex-col items-center justify-center gap-2 px-6'>
            <NutritionEtc>내가 생성한 설문</NutritionEtc>
            <Link
              href={NAV_LINKS[4].href}
              className='text-3xl font-semibold text-green-400 underline'
            >
              {surveyTotalItems}
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-end justify-between'>
              <CardTitle>최근 작성한 식단</CardTitle>
              <Link
                href={NAV_LINKS[3].href}
                hidden={mealTotalItems === 0}
                className='text-xs text-gray-500'
              >
                더보기
              </Link>
            </div>
            {mealList?.data.menuResponseDTOList ? (
              <GetAllListTable
                data={convertToTableRowData(mealList!.data.menuResponseDTOList)}
              />
            ) : (
              <div className='mt-1 flex justify-center'>
                <NutritionDate>최근 작성한 식단이 없습니다.</NutritionDate>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-end justify-between'>
              <CardTitle>최근 생성한 설문</CardTitle>
              <Link
                href={NAV_LINKS[4].href}
                hidden={surveyTotalItems === 0}
                className='text-xs text-gray-500'
              >
                더보기
              </Link>
            </div>
            {surveyList?.data.surveys ? (
              <GetAllListTable
                data={surveyConvertToTableRowData(surveyList!.data.surveys)}
              />
            ) : (
              <div className='mt-1 flex justify-center'>
                <NutritionDate>최근 생성한 설문이 없습니다.</NutritionDate>
              </div>
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
