'use client';

import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import { CardTitle, PageHeaderTitle } from '@/components/common/Typography';
import AverageGraph from '@/components/shared/ChartDetail/AverageGraph';
import BarGraph from '@/components/shared/ChartDetail/BarGraph';
import TextList from '@/components/shared/ChartDetail/TextList';
import TopCard from '@/components/shared/ChartDetail/TopCard';
import { DETAIL_SURVEY_DATA } from '@/constants/_detailSurvey';

interface Props {
  id: number;
}

const imageInfo = {
  size: 180,
  src: '/imgs/pi-gon-ping.jpg',
};

const ChartDetail = ({ id }: Props) => {
  const {
    surveyName,
    averageScores,
    desiredMenus,
    dislikedMenusTop3,
    likedMenusTop3,
    messagesToDietitian,
    satisfactionDistribution,
  } = DETAIL_SURVEY_DATA;

  // TODO: id는 api요청시에 param으로 사용예정
  console.log(id);

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex items-center justify-between'>
        <PageHeaderTitle>{surveyName}</PageHeaderTitle>
        <div className='flex h-8 gap-3'>
          <Button size='small'>설문 종료</Button>
          <Button size='small'>질문 수정</Button>
        </div>
      </div>
      <div className='flex w-full gap-5'>
        <div className='flex w-full flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
          <CardTitle>월별 총 만족도 점수 분포도</CardTitle>
          <BarGraph data={satisfactionDistribution} />
        </div>
        <div className='flex w-1/2 flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
          <CardTitle>만족도 평균</CardTitle>
          <AverageGraph averageScores={averageScores} />
        </div>
      </div>
      <div className='flex w-full gap-8'>
        <div className='flex w-full flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
          <TopCard title='식단 좋아요 Top3' top3Data={likedMenusTop3} />
          <TopCard title='식단 싫어요 Top3' top3Data={dislikedMenusTop3} />
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
          <TextList
            type='desireMenu'
            list={desiredMenus}
            title='먹고 싶은 메뉴 목록'
          />
        </div>
        <div className='flex w-2/3 flex-col gap-3'>
          <TextList
            type='message'
            list={messagesToDietitian}
            title='영양사에게 한마디'
          />
        </div>
      </div>
    </div>
  );
};

export default ChartDetail;
