'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { FailResponse } from '@/type/response';
import { Question } from '@/type/survey/surveyResponse';
import { getTextResponsesByQuestionText } from '@/utils/getTextResponseByQuestionText';
import Button from '@/components/common/Button/Button';
import DatepickerCalendar from '@/components/common/DatepickerCalendar';
import {
  Body2Assistive,
  Body2Black,
  Body3Assistive,
  H2Black,
  SubTitle1Black,
  Subtitle2Black,
  Subtitle2Green500,
  Subtitle2Grey100,
  Subtitle2Grey900,
} from '@/components/common/Typography';
import AverageGraph from '@/components/shared/ChartDetail/AverageGraph';
import BarGraph from '@/components/shared/ChartDetail/BarGraph';
import TextList from '@/components/shared/ChartDetail/TextList';
import TopCard from '@/components/shared/ChartDetail/TopCard';
import { NAV_LINKS, ROUTES } from '@/constants/_navbar';
import { surveyKeys } from '@/hooks/survey/queryKey';
import { useDeleteSurvey } from '@/hooks/survey/useDeleteSurvey';
import { useGetSurveyDetail } from '@/hooks/survey/useGetSurveyDetail';
// import { useGetSurveyQrCode } from '@/hooks/survey/useGetSurveyQrCode';
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

  // const { data: qrData } = useGetSurveyQrCode(id, {
  //   enabled: !!detailData,
  // });

  const { surveyName, averageScores, additionalQuestions, mandatoryQuestions } =
    detailData || {};

  const deleteHandler = () => {
    deleteSurveyMutate(id);
  };

  const isAllDistributionZero = (distribution: Question) => {
    const distributionValues = Object.values(distribution.radioResponses);
    return distributionValues.every((value) => value === 0);
  };

  // const copyQRcode = async () => {
  //   try {
  //     if (!qrData?.body) return;
  //     const imageUrl = `data:image/png;base64,${qrData.body}`;

  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();

  //     await navigator.clipboard.write([
  //       new ClipboardItem({ 'image/png': blob }),
  //     ]);

  //     showToast('QRcode 복사 성공', 'success', 1000);
  //   } catch (error) {
  //     showToast('QRcode 복사 실패', 'warning', 1000);
  //   }
  // };

  return (
    <div className='flex flex-col gap-10'>
      {detailData &&
        averageScores &&
        mandatoryQuestions &&
        additionalQuestions && (
          // qrData &&
          <div className='flex flex-col gap-6'>
            <H2Black>{surveyName}</H2Black>
            <div className='flex items-center justify-between'>
              <DatepickerCalendar
                deadLine={dayjs(detailData.deadline).format(
                  'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
                )}
                isChangeable={false}
              />
              <div className='flex h-12 gap-2'>
                <Button variant='secondary' size='sm'>
                  <Subtitle2Green500>설문 종료</Subtitle2Green500>
                </Button>
                <Button
                  variant='teritary'
                  size='sm'
                  onClick={() => navigate(`${ROUTES.SURVEY.EDIT}/${id}`)}
                >
                  <Subtitle2Grey100>질문 수정</Subtitle2Grey100>
                </Button>
                <Button variant='grey' size='sm' onClick={deleteHandler}>
                  <Subtitle2Grey900>설문 삭제</Subtitle2Grey900>
                </Button>
              </div>
            </div>
            <div className='flex h-[336px] w-full gap-6'>
              <div className='flex h-full w-full max-w-[1056px] flex-col gap-6 rounded-2xl bg-white-100 p-6'>
                <SubTitle1Black>월별 총 만족도 점수 분포도</SubTitle1Black>
                {mandatoryQuestions!.every(isAllDistributionZero) ? (
                  <div className='flex min-h-[130px] w-full items-center justify-center'>
                    <Body2Assistive>제출된 설문이 없습니다.</Body2Assistive>
                  </div>
                ) : (
                  <div className='h-full w-[1008px]'>
                    <BarGraph data={mandatoryQuestions![0].radioResponses} />
                  </div>
                )}
              </div>
              <div className='flex h-full w-[516px] flex-col gap-4 rounded-2xl bg-white-100 p-6'>
                <SubTitle1Black>만족도 평균</SubTitle1Black>
                {!Object.values(averageScores).every((score) => score === 0) ? (
                  <div className='h-full w-full'>
                    <AverageGraph averageScores={averageScores} />
                  </div>
                ) : (
                  <div className='flex min-h-[130px] w-full items-center justify-center'>
                    <Body2Assistive>제출된 설문이 없습니다.</Body2Assistive>
                  </div>
                )}
              </div>
            </div>
            <div className='flex w-full gap-6'>
              <TopCard
                title='식단 좋아요 Top3'
                type='like'
                top3Data={getTextResponsesByQuestionText(
                  mandatoryQuestions,
                  '가장 좋아하는 상위 3개 식단',
                )}
              />
              <TopCard
                title='식단 싫어요 Top3'
                type='unlike'
                top3Data={getTextResponsesByQuestionText(
                  mandatoryQuestions,
                  '가장 싫어하는 상위 3개 식단',
                )}
              />
            </div>
            <div className='flex w-full gap-6'>
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
              <TextList
                type='desireMenu'
                list={
                  getTextResponsesByQuestionText(
                    mandatoryQuestions,
                    '영양사에게 한마디',
                  )!
                }
                title='영양사에게 한마디'
              />
              <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
                <SubTitle1Black>설문 조사 링크</SubTitle1Black>
                <div className='flex w-full items-center gap-6'>
                  <div className='flex min-h-[120px] min-w-[120px] items-center justify-center rounded-lg border border-grey-100'>
                    <Image
                      width={96}
                      height={96}
                      src={`/imgs/pi-gon-ping.jpg`}
                      alt='qr이미지'
                      onClick={() => navigate(`${ROUTES.SURVEY.TAKE}/${id}`)}
                    />
                  </div>
                  <div className='flex w-full flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                      <Body3Assistive>
                        QR 코드를 다운로드하거나 URL을 복사하여
                        <br />
                        작성한 설문을 간편하게 공유하세요!
                      </Body3Assistive>
                      <Body2Black>https://www.nnplanner.com/qrqrqr</Body2Black>
                    </div>
                    <div className='flex w-full gap-2'>
                      <Button variant='outline' size='xs' width='full'>
                        <Subtitle2Black>QR 코드 다운로드</Subtitle2Black>
                      </Button>
                      <Button variant='outline' size='xs' width='full'>
                        <Subtitle2Black>URL 복사</Subtitle2Black>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ChartDetail;
