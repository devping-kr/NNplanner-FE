'use client';

import GetAllListTable from '../../GetAllList/ListTable';
import SeasonCard from '../Cards/SeasonCard';
import { CardTitle, NutritionDate } from '@/components/common/Typography';
import BarGraph from '@/components/shared/ChartDetail/BarGraph';
import MainTopCard from '@/components/shared/Main/Cards/MainTopCard';
import MiniCard from '@/components/shared/Main/Cards/MiniCard';
import { DETAIL_SURVEY_DATA } from '@/constants/_detailSurvey';
import { PLAN_DATA } from '@/constants/_getAllList/_planData';
import { SURVEY_DATA } from '@/constants/_getAllList/_surveyData';
import { SEASON_DATA } from '@/constants/_seasonData';

// api를 통해 받아올 데이터들
const PREV_PLAN_DATA_LENGTH = 6;
const PREV_SURVEY_DATA_LENGTH = 10;
const PLAN_LENGTH = 4;
const { likedMenusTop3, satisfactionDistribution } = DETAIL_SURVEY_DATA;

const today = new Date();
const month = today.getMonth();

const MainPageBody = () => {
  const upDownPlanPercent = Math.floor(
    ((PLAN_DATA.length - PREV_PLAN_DATA_LENGTH) / PREV_PLAN_DATA_LENGTH) * 100,
  );
  const upDownSurveyPercent = Math.floor(
    ((SURVEY_DATA.length - PREV_SURVEY_DATA_LENGTH) / PREV_SURVEY_DATA_LENGTH) *
      100,
  );

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-3'>
        <MiniCard
          title='관리중인 식단'
          icon='time'
          color='active'
          count={PLAN_DATA.length}
          upDownPercent={upDownPlanPercent}
          type='plan'
        />
        <MiniCard
          title='진행중인 설문'
          icon='group'
          color='active'
          count={SURVEY_DATA.length}
          upDownPercent={upDownSurveyPercent}
          type='survey'
        />
        <MainTopCard
          title='최근 마감한 설문 좋아요 Top3 메뉴'
          top3Data={likedMenusTop3}
        />
      </div>
      <div className='flex gap-3'>
        <div className='flex w-1/2 flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
          <CardTitle>최근 진행한 총 만족도 점수 분포도</CardTitle>
          <BarGraph data={satisfactionDistribution} />
        </div>
        <div className='flex w-1/2 flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
          <CardTitle>최근 작성한 식단 리스트</CardTitle>
          {!PLAN_LENGTH ? (
            <div className='mt-1 flex justify-center'>
              <NutritionDate>최근 작성한 식단이 없습니다.</NutritionDate>
            </div>
          ) : (
            <GetAllListTable data={PLAN_DATA.slice(0, 5)} />
          )}
        </div>
      </div>
      <div className='flex w-full flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
        <CardTitle>{`${month}월의 제철 메뉴 / 식재료`}</CardTitle>
        <SeasonCard data={SEASON_DATA} />
      </div>
    </div>
  );
};

export default MainPageBody;
