'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FailResponse } from '@/type/response';
import Button from '@/components/common/Button/Button';
import {
  CardTitle,
  HeadPrimary,
  PageHeaderTitle,
} from '@/components/common/Typography';
import AverageGraph from '@/components/shared/ChartDetail/AverageGraph';
import BarGraph from '@/components/shared/ChartDetail/BarGraph';
import TextList from '@/components/shared/ChartDetail/TextList';
import TopCard from '@/components/shared/ChartDetail/TopCard';
import { NAV_LINKS, ROUTES } from '@/constants/_navbar';
import { surveyKeys } from '@/hooks/survey/queryKey';
import { useDeleteSurvey } from '@/hooks/survey/useDeleteSurvey';
import { useGetSurveyDetail } from '@/hooks/survey/useGetSurveyDetail';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  id: number;
}

const imageInfo = {
  size: 180,
  src: '/imgs/pi-gon-ping.jpg',
};

const ChartDetail = ({ id }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  const { mutate: deleteSurveyMutate } = useDeleteSurvey({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: surveyKeys.lists() });
      router.push(NAV_LINKS[4].href);
      showToast('설문 삭제 성공', 'success', 1000);
    },
    onError: (error: AxiosError<FailResponse>) => {
      const errorMessage = error.response?.data.message || '설문 삭제 실패';
      showToast(errorMessage, 'warning', 1000);
    },
  });

  const { data: detailData } = useGetSurveyDetail(id);

  const {
    surveyName,
    averageScores,
    desiredMenus,
    dislikedMenusTop3,
    likedMenusTop3,
    messagesToDietitian,
    satisfactionDistributions,
    // TODO: QR코드 백엔드 작업 완료되면 작업 예정
    // originalSurveyUrl,
  } = detailData || {};

  const deleteHandler = () => {
    deleteSurveyMutate(id);
  };

  return (
    <div className='flex flex-col gap-10'>
      {detailData && (
        <>
          <div className='flex items-center justify-between'>
            <PageHeaderTitle>{surveyName}</PageHeaderTitle>
            <div className='flex h-8 gap-3'>
              <Button size='small'>설문 종료</Button>
              <Button
                size='small'
                onClick={() => router.push(`${ROUTES.EDIT.SURVEY}/${id}`)}
              >
                질문 수정
              </Button>
              <Button size='small' onClick={deleteHandler}>
                설문 삭제
              </Button>
            </div>
          </div>
          <div className='flex w-full gap-5'>
            <div className='flex w-full flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
              <CardTitle>월별 총 만족도 점수 분포도</CardTitle>
              {satisfactionDistributions &&
              !satisfactionDistributions?.every((satisfaction) =>
                Object.values(satisfaction.distribution).every(
                  (value) => value === 0,
                ),
              ) ? (
                <BarGraph data={satisfactionDistributions[0].distribution} />
              ) : (
                <HeadPrimary>제출된 설문이 없습니다.</HeadPrimary>
              )}
            </div>
            <div className='flex w-1/2 flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
              <CardTitle>만족도 평균</CardTitle>
              {averageScores &&
              !Object.values(averageScores).every((score) => score === 0) ? (
                <AverageGraph averageScores={averageScores} />
              ) : (
                <HeadPrimary>제출된 설문이 없습니다.</HeadPrimary>
              )}
            </div>
          </div>
          <div className='flex w-full gap-8'>
            <div className='flex w-full flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
              {likedMenusTop3 && (
                <TopCard title='식단 좋아요 Top3' top3Data={likedMenusTop3} />
              )}
              {dislikedMenusTop3 && (
                <TopCard
                  title='식단 싫어요 Top3'
                  top3Data={dislikedMenusTop3}
                />
              )}
            </div>
            <div className='flex w-1/3 flex-col gap-3'>
              <div className='mb-3 flex flex-1 flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
                <CardTitle>설문 조사 링크</CardTitle>
                <div className='flex items-center justify-center'>
                  <Image
                    src={imageInfo.src}
                    width={imageInfo.size}
                    height={imageInfo.size}
                    alt='qr이미지'
                  />
                </div>
              </div>
              {desiredMenus && (
                <TextList
                  type='desireMenu'
                  list={desiredMenus}
                  title='먹고 싶은 메뉴 목록'
                />
              )}
            </div>
            <div className='flex w-2/3 flex-col gap-3'>
              {messagesToDietitian && (
                <TextList
                  type='message'
                  list={messagesToDietitian}
                  title='영양사에게 한마디'
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartDetail;
