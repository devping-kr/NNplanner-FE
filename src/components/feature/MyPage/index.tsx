'use client';

// import Image from 'next/image';
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
import { findOriginalId } from '@/utils/findOriginalId';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import ProfileImage from '@/components/common/ProfileImage';
import { TableRowData } from '@/components/common/Table';
import {
  Body1Black,
  Body2Black,
  Body2Grey600,
  Caption1Grey400,
  Caption1Red500,
  H2BlackH2,
  Label1Black,
  SubTitle1Black,
  SubTitle1Grey100,
  Subtitle1White,
  Subtitle2Black,
  Subtitle2Grey100,
  Subtitle2White,
} from '@/components/common/Typography';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import { ROUTES } from '@/constants/_navbar';
import { useGetMealList } from '@/hooks/meal/useGetMealList';
import { useGetSurveyList } from '@/hooks/survey/useGetSurveyList';
import { useAuth } from '@/hooks/useAuth';
import useNavigate from '@/hooks/useNavigate';
import { usePostCheckPw } from '@/hooks/user/usePostCheckPw';
import { usePostEditPw } from '@/hooks/user/usePostEditPw';
import { useModalStore } from '@/stores/modalStore';
import { useToastStore } from '@/stores/useToastStore';
import { useUserStore } from '@/stores/useUserStore';

const imageInfo = {
  size: 96,
  src: '/imgs/pi-gon-ping.jpg',
};

const LIST_SIZE = 3;

const MyPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { openModal, closeModal } = useModalStore();
  const { logout } = useAuth();
  const showToast = useToastStore((state) => state.showToast);
  const { username, email } = useUserStore((state) => ({
    username: state.username,
    email: state.email,
  }));

  const { mutate: checkPwMutate, isSuccess: isCheckPwSuccess } =
    usePostCheckPw();
  const { mutate: editPwMutate } = usePostEditPw();
  const { data: surveyList } = useGetSurveyList({
    pageSize: LIST_SIZE,
  });
  const { data: mealList } = useGetMealList({
    page: 0,
    sort: 'createdAt,desc',
    size: LIST_SIZE,
  });

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
      '식단 ID': menu.monthMenuId.substring(0, 4),
      '식단 이름': menu.monthMenuName,
      대분류: menu.majorCategory,
      소분류: menu.minorCategory,
      생성일: dayjs(menu.createAt).format('YYYY-MM-DD'),
    }));
  };

  const surveyConvertToTableRowData = (
    surveys: surveyType[],
  ): TableRowData[] => {
    return surveys.map((survey) => ({
      '설문 ID': survey.surveyId,
      '설문 이름': survey.surveyName,
      마감일: dayjs(survey.deadlineAt).format('YYYY-MM-DD'),
      생성일: dayjs(survey.createdAt).format('YYYY-MM-DD'),
      상태: survey.state === 'IN_PROGRESS' ? '진행중' : '마감',
    }));
  };

  const { navigate } = useNavigate();

  const handleMealRowClick = (id: string | number) => {
    if (!mealList?.data) return;
    findOriginalId({
      list: mealList.data.menuResponseDTOList.slice(0, 4),
      matchField: 'monthMenuId',
      matchValue: id as string,
      navigateTo: ROUTES.VIEW.PLAN,
      getId: (menu) => menu.monthMenuId,
      navigate,
    });
  };

  const handleSurveyRowClick = (id: number) => {
    if (!surveyList?.data) return;
    navigate(`${ROUTES.VIEW.CHART}/${id}`);
  };

  return (
    isMounted && (
      <>
        <Modal>
          <form
            onSubmit={handleSubmit(submitChangePassword)}
            className='w-full'
          >
            <fieldset className='w-full'>
              <legend className='sr-only'>비밀번호 변경</legend>
              <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100'>
                <SubTitle1Black>비밀번호 변경</SubTitle1Black>
                <div className='flex flex-col gap-4'>
                  <div className='flex w-full flex-col gap-2'>
                    <Label1Black htmlFor='currentPassword'>
                      현재 비밀번호
                    </Label1Black>
                    <div className='flex h-16 w-full gap-3'>
                      <div className='min-w-[368px]'>
                        <Input
                          type='password'
                          placeholder='현재 비밀번호를 입력해 주세요.'
                          id='currentPassword'
                          size='m'
                          variant='grey50'
                          value={currentPassword}
                          {...register('currentPassword')}
                        />
                      </div>
                      <Button
                        variant='teritary'
                        size='lg'
                        className='min-w-[100px]'
                        onClick={handleCheckPassword}
                        disabled={currentPassword.length === 0}
                      >
                        <SubTitle1Grey100>확인</SubTitle1Grey100>
                      </Button>
                    </div>
                  </div>
                  <div className='flex w-full flex-col gap-2'>
                    <Label1Black htmlFor='newPassword'>
                      변경 비밀번호
                    </Label1Black>
                    <div className='flex h-16 w-full gap-3'>
                      <Input
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder='변경할 비밀번호를 입력해 주세요.'
                        id='newPassword'
                        size='m'
                        variant='grey50'
                        disabled={!isCheckPwSuccess}
                        isRightIcon={true}
                        rightIcon={!isShowPassword ? 'show' : 'hide'}
                        rightIconAction={() =>
                          setIsShowPassword(!isShowPassword)
                        }
                        {...register('newPassword')}
                      />
                    </div>
                    {errors.newPassword && (
                      <Caption1Red500>
                        {errors.newPassword.message}
                      </Caption1Red500>
                    )}
                  </div>
                  <div className='flex w-full flex-col gap-2'>
                    <Label1Black htmlFor='newPasswordConfirm'>
                      변경 비밀번호 확인
                    </Label1Black>
                    <div className='flex h-16 w-full gap-3'>
                      <Input
                        type={isShowPasswordConfirm ? 'text' : 'password'}
                        placeholder='변경할 비밀번호를 다시 입력해 주세요.'
                        id='newPasswordConfirm'
                        size='m'
                        variant='grey50'
                        disabled={!isCheckPwSuccess}
                        isRightIcon={true}
                        rightIcon={!isShowPasswordConfirm ? 'show' : 'hide'}
                        rightIconAction={() =>
                          setIsShowPasswordConfirm(!isShowPasswordConfirm)
                        }
                        {...register('newPasswordConfirm')}
                      />
                    </div>
                    {errors.newPasswordConfirm && (
                      <Caption1Red500>
                        {errors.newPasswordConfirm.message}
                      </Caption1Red500>
                    )}
                  </div>
                </div>
                <div className='flex gap-4'>
                  <Button
                    size='lg'
                    variant='grey'
                    width='full'
                    type='button'
                    onClick={closeModal}
                  >
                    <SubTitle1Black>취소</SubTitle1Black>
                  </Button>
                  <Button
                    size='lg'
                    width='full'
                    type='submit'
                    disabled={
                      !isCheckPwSuccess ||
                      !!errors.newPassword ||
                      !!errors.newPasswordConfirm
                    }
                  >
                    <Subtitle1White>변경</Subtitle1White>
                  </Button>
                </div>
              </div>
            </fieldset>
          </form>
        </Modal>
        <div className='flex w-full flex-col gap-6'>
          <H2BlackH2>마이페이지</H2BlackH2>
          <div className='flex h-36 w-full justify-between rounded-2xl bg-white-100 p-6'>
            <div className='flex gap-6'>
              <ProfileImage src={imageInfo.src} size={imageInfo.size} />
              <div className='flex flex-col gap-4'>
                <div className='flex gap-[2px]'>
                  <SubTitle1Black>{username}</SubTitle1Black>
                  <Body1Black>님 안녕하세요.</Body1Black>
                </div>
                <div className='flex flex-col gap-1'>
                  <Label1Black>ID</Label1Black>
                  <Body2Black>{email}</Body2Black>
                </div>
              </div>
            </div>
            <div className='flex h-full items-end gap-2'>
              <Button size='xs' variant='primary' onClick={openModal}>
                <Subtitle2White>비밀번호 변경</Subtitle2White>
              </Button>
              <Button
                size='xs'
                variant='teritary'
                className='gap-1'
                onClick={logout}
              >
                <Icon name='logout' width={24} height={24} color='grey100' />
                <Subtitle2Grey100>로그아웃</Subtitle2Grey100>
              </Button>
            </div>
          </div>
          <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
            <div className='flex w-full justify-between'>
              <SubTitle1Black>최근 작성한 식단</SubTitle1Black>
              <Link href={ROUTES.VIEW.PLAN}>
                <Body2Grey600>더 보기</Body2Grey600>
              </Link>
            </div>
            {mealList?.data.menuResponseDTOList ? (
              <GetAllListTable
                data={convertToTableRowData(mealList!.data.menuResponseDTOList)}
                onRowClick={(id) => handleMealRowClick(id)}
                headerType='viewPlan'
              />
            ) : (
              <div className='flex justify-center'>
                <Subtitle2Black>최근 작성한 식단이 없습니다.</Subtitle2Black>
              </div>
            )}
          </div>
          <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
            <div className='flex w-full justify-between'>
              <SubTitle1Black>최근 생성한 설문</SubTitle1Black>
              <Link href={ROUTES.VIEW.CHART}>
                <Body2Grey600>더 보기</Body2Grey600>
              </Link>
            </div>
            {surveyList?.data.surveys ? (
              <GetAllListTable
                data={surveyConvertToTableRowData(surveyList!.data.surveys)}
                onRowClick={(id) => handleSurveyRowClick(Number(id))}
                headerType='viewChart'
              />
            ) : (
              <div className='flex justify-center'>
                <Subtitle2Black>최근 생성한 설문이 없습니다.</Subtitle2Black>
              </div>
            )}
          </div>
          <div className='flex justify-between'>
            <div />
            <Caption1Grey400>회원탈퇴</Caption1Grey400>
          </div>
        </div>
      </>
    )
  );
};

export default MyPage;
