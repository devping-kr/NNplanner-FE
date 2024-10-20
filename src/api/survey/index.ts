import { get, post, del, put } from '@/lib/axios';
import { Result } from '@/type/response';
import {
  GetSearchSurveyRequest,
  PostSurveyRequest,
  PutSurveyRequest,
} from '@/type/survey/surveyRequest';
import {
  PutSurveyResponse,
  SurveyDetailResponse,
  SurveyListResponse,
  SurveyPostResponse,
} from '@/type/survey/surveyResponse';
import { SURVEY_API } from '@/constants/_apiPath';

const getSurveyList = async ({
  search,
  sort = 'createdAt,desc',
  page,
  pageSize = 8,
  startDate,
  endDate,
  state,
}: GetSearchSurveyRequest) => {
  const response = await get<Result<SurveyListResponse>>(
    `${SURVEY_API.SURVEYS}`,
    {
      params: { search, sort, page, pageSize, startDate, endDate, state },
    },
  );
  return response.data;
};

const postSurvey = async (request: PostSurveyRequest) => {
  const response = await post<Result<SurveyPostResponse>>(
    SURVEY_API.SURVEYS,
    request,
  );
  return response.data;
};

const deleteSurvey = async (surveyId: number) => {
  const response = await del<Result<null>>(`${SURVEY_API.SURVEYS}/${surveyId}`);
  return response.data;
};

const getSurveyDetail = async (surveyId: number) => {
  const response = await get<Result<SurveyDetailResponse>>(
    `${SURVEY_API.SURVEYS}/${surveyId}`,
  );
  return response.data.data;
};

const putSurvey = async (id: number, request: PutSurveyRequest) => {
  const response = await put<Result<PutSurveyResponse>>(
    `${SURVEY_API.SURVEYS}/${id}`,
    request,
  );
  return response.data;
};

export const survey = {
  getSurveyList,
  postSurvey,
  deleteSurvey,
  getSurveyDetail,
  putSurvey,
};
