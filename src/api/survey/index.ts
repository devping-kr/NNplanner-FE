import { get, post } from '@/lib/axios';
import { Result } from '@/type/response';
import { PostSurveyRequest } from '@/type/survey/surveyRequest';
import {
  SurveyListResponse,
  SurveyPostResponse,
} from '@/type/survey/surveyResponse';
import { SURVEY_API } from '@/constants/_apiPath';

const getSurveyList = async () => {
  const response = await get<Result<SurveyListResponse>>(SURVEY_API.SURVEYS);
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
