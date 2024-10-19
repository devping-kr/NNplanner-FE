'use client';

import dayjs from 'dayjs';
import { MenuResponseDTO } from '@/type/menu/menuResponse';
import { getCurrentYearMonthNow } from '@/utils/calendar';
import { TableRowData } from '@/components/common/Table';
import { CardTitle, NutritionDate } from '@/components/common/Typography';
import BarGraph from '@/components/shared/ChartDetail/BarGraph';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import MainTopCard from '@/components/shared/Main/Cards/MainTopCard';
import MiniCard from '@/components/shared/Main/Cards/MiniCard';
import SeasonCard from '@/components/shared/Main/Cards/SeasonCard';
import { DETAIL_SURVEY_DATA } from '@/constants/_detailSurvey';
import { PLAN_DATA } from '@/constants/_getAllList/_planData';
import { SURVEY_DATA } from '@/constants/_getAllList/_surveyData';
import { ROUTES } from '@/constants/_navbar';
import { SEASON_DATA } from '@/constants/_seasonData';
import { useGetMealList } from '@/hooks/meal/useGetMealList';
import useNavigate from '@/hooks/useNavigate';

const SURVEY_LIST_SIZE = 5;
// api를 통해 받아올 데이터들
// 이전 달 식단 개수
const PREV_PLAN_DATA_LENGTH = 6;
// 이전 달 설문 개수
const PREV_SURVEY_DATA_LENGTH = 10;
const { likedMenusTop3, satisfactionDistribution } = DETAIL_SURVEY_DATA;

const MainPageBody = () => {
  const upDownPlanPercent = Math.floor(
    ((PLAN_DATA.length - PREV_PLAN_DATA_LENGTH) / PREV_PLAN_DATA_LENGTH) * 100,
  );
  const upDownSurveyPercent = Math.floor(
    ((SURVEY_DATA.length - PREV_SURVEY_DATA_LENGTH) / PREV_SURVEY_DATA_LENGTH) *
      100,
  );

  const { navigate } = useNavigate();
  const { month } = getCurrentYearMonthNow();

  const { data: mealList } = useGetMealList({
    page: 0,
    sort: 'createdAt,desc',
    size: SURVEY_LIST_SIZE,
  });

  const convertToTableRowData = (menus: MenuResponseDTO[]): TableRowData[] => {
    return menus.map((menu) => ({
      식단ID: menu.monthMenuId.substring(0, 4),
      식단이름: menu.monthMenuName,
      대분류: menu.majorCategory,
      소분류: menu.minorCategory,
      생성일: dayjs(menu.createAt).format('YYYY-MM-DD'),
    }));
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-3'>
        <MiniCard
          title='관리 중인 식단'
          icon='time'
          color='active'
          count={PLAN_DATA.length}
          upDownPercent={upDownPlanPercent}
          type='plan'
        />
        <MiniCard
          title='진행 중인 설문'
          icon='group'
          color='success'
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
          <CardTitle>최신 설문 만족도 분포</CardTitle>
          <BarGraph data={satisfactionDistribution} />
        </div>
        <div className='flex w-1/2 flex-col gap-3 rounded border border-gray-300 bg-white-100 p-5'>
          <CardTitle>최신 식단 목록</CardTitle>
          {!mealList?.data.menuResponseDTOList ? (
            <div className='mt-1 flex justify-center'>
              <NutritionDate>최근 작성한 식단이 없습니다.</NutritionDate>
            </div>
          ) : (
            <GetAllListTable
              data={convertToTableRowData(
                mealList.data.menuResponseDTOList.slice(0, 5),
              )}
              onRowClick={(id) => {
                navigate(`${ROUTES.VIEW.PLAN}/${id}`);
              }}
            />
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
