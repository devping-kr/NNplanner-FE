import { get, post } from '@/lib/axios';
import { Result } from '@/type/response';
import {
  GetSearchSurveyRequest,
  PostSurveyRequest,
} from '@/type/survey/surveyRequest';
import {
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
}: GetSearchSurveyRequest) => {
  const response = await get<Result<SurveyListResponse>>(
    `${SURVEY_API.SURVEYS}`,
    {
      params: { search, sort, page, pageSize, startDate, endDate },
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

export const survey = {
  getSurveyList,
  postSurvey,
};
