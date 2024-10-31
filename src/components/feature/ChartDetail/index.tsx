'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FailResponse } from '@/type/response';
import { Question } from '@/type/survey/surveyResponse';
import { getTextResponsesByQuestionText } from '@/utils/getTextResponseByQuestionText';
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
import { useGetSurveyQrCode } from '@/hooks/survey/useGetSurveyQrCode';
import useNavigate from '@/hooks/useNavigate';
import { useToastStore } from '@/stores/useToastStore';

interface Props {
  id: number;
}

const ChartDetail = ({ id }: Props) => {
  const router = useRouter();
  const { navigate } = useNavigate();
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

  const { data: qrData } = useGetSurveyQrCode(id, {
    enabled: !!detailData,
  });

  const { surveyName, averageScores, additionalQuestions, mandatoryQuestions } =
    detailData || {};

  const deleteHandler = () => {
    deleteSurveyMutate(id);
  };

  const isAllDistributionZero = (distribution: Question) => {
    const distributionValues = Object.values(distribution.radioResponses);
    return distributionValues.every((value) => value === 0);
  };

  const copyQRcode = async () => {
    try {
      if (!qrData?.body) return;
      const imageUrl = `data:image/png;base64,${qrData.body}`;

      const response = await fetch(imageUrl);
      const blob = await response.blob();

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);

      showToast('QRcode 복사 성공', 'success', 1000);
    } catch (error) {
      showToast('QRcode 복사 실패', 'warning', 1000);
    }
  };

  return (
    <div className='flex flex-col gap-10'>
      {detailData &&
        averageScores &&
        mandatoryQuestions &&
        additionalQuestions &&
        qrData && (
          <>
            <div className='flex items-center justify-between'>
              <PageHeaderTitle>{surveyName}</PageHeaderTitle>
              <div className='flex h-8 gap-3'>
                <Button size='small'>설문 종료</Button>
                <Button
                  size='small'
                  onClick={() => navigate(`${ROUTES.SURVEY.EDIT}/${id}`)}
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
                {mandatoryQuestions!.every(isAllDistributionZero) ? (
                  <HeadPrimary>제출된 설문이 없습니다.</HeadPrimary>
                ) : (
                  <BarGraph data={mandatoryQuestions![0].radioResponses} />
                )}
              </div>
              <div className='flex w-1/2 flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
                <CardTitle>만족도 평균</CardTitle>
                {!Object.values(averageScores).every((score) => score === 0) ? (
                  <AverageGraph averageScores={averageScores} />
                ) : (
                  <HeadPrimary>제출된 설문이 없습니다.</HeadPrimary>
                )}
              </div>
            </div>
            <div className='flex w-full gap-8'>
              <div className='flex w-full flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
                <TopCard
                  title='식단 좋아요 Top3'
                  top3Data={getTextResponsesByQuestionText(
                    mandatoryQuestions,
                    '가장 좋아하는 상위 3개 식단',
                  )}
                />
                <TopCard
                  title='식단 싫어요 Top3'
                  top3Data={getTextResponsesByQuestionText(
                    mandatoryQuestions,
                    '가장 싫어하는 상위 3개 식단',
                  )}
                />
              </div>
              <div className='flex w-1/3 flex-col gap-3'>
                <div className='mb-3 flex flex-1 flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
                  <CardTitle>설문 조사 링크</CardTitle>
                  <div className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded border border-gray-300'>
                    <Image
                      width={180}
                      height={180}
                      style={{ borderRadius: 4 }}
                      src={`data:image/png;base64,${qrData.body}`}
                      alt='qr이미지'
                      onClick={() => navigate(`${ROUTES.SURVEY.TAKE}/${id}`)}
                    />
                    <Button
                      size='xSmall'
                      width='fit'
                      className='mb-2 rounded'
                      onClick={copyQRcode}
                    >
                      QRcode 복사
                    </Button>
                  </div>
                </div>
                <TextList
                  type='desireMenu'
                  list={
                    getTextResponsesByQuestionText(
                      mandatoryQuestions,
                      '먹고 싶은 메뉴',
                    )!
                  }
                  title='먹고 싶은 메뉴'
                />
              </div>
              <div className='flex w-2/3 flex-col gap-3'>
                <TextList
                  type='message'
                  list={
                    getTextResponsesByQuestionText(
                      mandatoryQuestions,
                      '영양사에게 한마디',
                    )!
                  }
                  title='영양사에게 한마디'
                />
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default ChartDetail;
