// import { get } from '@/lib/axios';
import { env } from '@/lib/env';
import { Result } from '@/type/response';
import { SurveyListResponse } from '@/type/survey/surveyResponse';

// const getSurveyList = async () => {
//   const response = await get<Result<SurveyListResponse>>('/api/surveys');
//   return response.data;
// };

const getSurveyList = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch(`${env.BASE_API_URL}/api/surveys`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${accessToken}`,
      // Authorization: `Bearer ${accessToken}`,
    },
    // credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch survey list');
  }

  const data = (await response.json()) as Result<SurveyListResponse>;
  return data;
};

export const survey = {
  getSurveyList,
};
