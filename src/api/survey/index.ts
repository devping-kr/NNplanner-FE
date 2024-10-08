import { get } from '@/lib/axios';
import { Result } from '@/type/response';
import { SurveyListResponse } from '@/type/survey/surveyResponse';

const getSurveyList = async () => {
  const response = await get<Result<SurveyListResponse>>('/api/surveys');
  return response.data;
};

// const getSurveyList = async () => {
//   const accessToken = localStorage.getItem('accessToken');

//   const response = await fetch(
//     'https://port-0-nnplanner-be-2aat2llv7xzes5.sel5.cloudtype.app/api/surveys',
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       credentials: 'include',
//     },
//   );

//   if (!response.ok) {
//     throw new Error('Failed to fetch survey list');
//   }

//   const data = (await response.json()) as Result<SurveyListResponse>;
//   return data;
// };

export const survey = {
  getSurveyList,
};
