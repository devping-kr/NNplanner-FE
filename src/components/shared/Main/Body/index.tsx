'use client';

import Link from 'next/link';
import dayjs from 'dayjs';
import { MenuResponseDTO } from '@/type/menu/menuResponse';
import { MenuRecipeListResponse } from '@/type/openAPI/recipeResponse';
import { findOriginalId } from '@/utils/findOriginalId';
import { calculateUpdownPercent, countSurveysByMonth } from '@/utils/survey';
import { TableRowData } from '@/components/common/Table';
import {
  Body2Grey600,
  NutritionDate,
  SubTitle1Black,
} from '@/components/common/Typography';
import BarGraph from '@/components/shared/ChartDetail/BarGraph';
import GetAllListTable from '@/components/shared/GetAllList/ListTable';
import MainTopCard from '@/components/shared/Main/Cards/MainTopCard';
import MiniCard from '@/components/shared/Main/Cards/MiniCard';
import SeasonCard from '@/components/shared/Main/Cards/SeasonCard';
import { DETAIL_SURVEY_DATA } from '@/constants/_detailSurvey';
import { ROUTES } from '@/constants/_navbar';
import { useGetMealList } from '@/hooks/meal/useGetMealList';
import { useGetMenuCount } from '@/hooks/menu/useGetMenuCount';
import { useGetMenuRecipeList } from '@/hooks/openAPI/useGetMenuRecipeList';
import { useGetSurveyList } from '@/hooks/survey/useGetSurveyList';
import useNavigate from '@/hooks/useNavigate';

const SURVEY_LIST_SIZE = 5;
const { likedMenusTop3, satisfactionDistribution } = DETAIL_SURVEY_DATA;

const MainPageBody = () => {
  const { data: surveyList, isSuccess } = useGetSurveyList({});
  const { data: mealCounts, isSuccess: isMealCountSuccess } = useGetMenuCount();
  const { data: recipeList, isSuccess: isRecipeSuccess } =
    useGetMenuRecipeList();
  const { data: mealList } = useGetMealList({
    page: 0,
    sort: 'createdAt,desc',
    size: SURVEY_LIST_SIZE,
  });

  const surveyTotalItems = isSuccess ? surveyList!.data.totalItems : 0;
  const { thisMonth, lastMonth } = isSuccess
    ? countSurveysByMonth(surveyList!.data.surveys)
    : { thisMonth: 0, lastMonth: 0 };

  const currentMenuCount = isMealCountSuccess
    ? mealCounts!.data.currentMenuCount
    : 0;
  const lastMenuCount = isMealCountSuccess ? mealCounts!.data.lastMenuCount : 0;

  const upDownPlanPercent = calculateUpdownPercent(
    currentMenuCount,
    lastMenuCount,
  );
  const upDownSurveyPercent = calculateUpdownPercent(thisMonth, lastMonth);

  const recipeData = isRecipeSuccess
    ? recipeList!.data
    : [
        {
          recipeId: '',
          month: 0,
          recipeName: '',
          mainIngredient: '',
          subIngredient: '',
          instructions: '',
          forGroup: '',
          imageUrl: '',
        } as MenuRecipeListResponse,
      ];

  const { navigate } = useNavigate();

  const convertToTableRowData = (menus: MenuResponseDTO[]): TableRowData[] => {
    return menus.map((menu) => ({
      '식단 ID': menu.monthMenuId.slice(0, 4),
      '식단 이름': menu.monthMenuName,
      대분류: menu.majorCategory,
      소분류: menu.minorCategory,
      생성일: dayjs(menu.createAt).format('YYYY-MM-DD'),
    }));
  };

  const handleRowClick = (id: string | number) => {
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

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-6'>
        <MiniCard
          title='관리 중 식단'
          icon='emptyCalendar'
          count={currentMenuCount}
          upDownPercent={upDownPlanPercent}
          type='plan'
        />
        <MiniCard
          title='진행 중 설문'
          icon='user'
          count={surveyTotalItems}
          upDownPercent={upDownSurveyPercent}
          type='survey'
        />
        <MainTopCard title='인기 식단 Top3' top3Data={likedMenusTop3} />
      </div>
      <div className='flex h-[428px] w-full gap-6'>
        <div className='flex h-full w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
          <SubTitle1Black>설문 만족도 분포</SubTitle1Black>
          <BarGraph type='main' data={satisfactionDistribution} />
        </div>
        <div className='flex h-full w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
          <div className='flex items-center justify-between'>
            <SubTitle1Black>최신 식단 목록</SubTitle1Black>
            <Link href={'/viewPlan'}>
              <Body2Grey600>더 보기</Body2Grey600>
            </Link>
          </div>
          {mealList?.data.menuResponseDTOList ? (
            <GetAllListTable
              data={convertToTableRowData(
                mealList.data.menuResponseDTOList.slice(0, 5),
              )}
              onRowClick={(id) => handleRowClick(id)}
              headerType='viewPlan'
              miniList
            />
          ) : (
            <div className='mt-1 flex justify-center'>
              <NutritionDate>최근 작성한 식단이 없습니다.</NutritionDate>
            </div>
          )}
        </div>
      </div>
      <div className='flex w-full flex-col gap-6 rounded-2xl bg-white-100 p-6'>
        <SubTitle1Black>{`${recipeData[0].month}월의 제철 레시피`}</SubTitle1Black>
        <SeasonCard data={recipeData} />
      </div>
    </div>
  );
};

export default MainPageBody;
