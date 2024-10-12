import { get } from '@/lib/axios';
import { Result } from '@/type/response';
import { SurveyListResponse } from '@/type/survey/surveyResponse';
import { SURVEY_API } from '@/constants/_apiPath';

const getSurveyList = async () => {
  const response = await get<Result<SurveyListResponse>>(SURVEY_API.SURVEYS);
  return response.data;
};

export const survey = {
  getSurveyList,
};
