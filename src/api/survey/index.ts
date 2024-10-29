import { get, post, del, put } from '@/lib/axios';
import { env } from '@/lib/env';
import { Result } from '@/type/response';
import {
  GetSearchSurveyRequest,
  PostServeyQrCodeRequest,
  PostServeyResponsesRequest,
  PostSurveyRequest,
  PutSurveyRequest,
} from '@/type/survey/surveyRequest';
import {
  GetSurveyQrCodeResponse,
  PostSurveyQrCodeResponse,
  PostSurveyResponsesResponse,
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

const postResponses = async (
  id: number,
  request: PostServeyResponsesRequest,
) => {
  const response = await post<Result<PostSurveyResponsesResponse>>(
    `${SURVEY_API.SURVEYS}/${id}${SURVEY_API.RESPONSES}`,
    request,
  );
  return response.data;
};

const postSurveyQrCode = async (reqeust: PostServeyQrCodeRequest) => {
  const response = await post<Result<PostSurveyQrCodeResponse>>(
    `${env.QR_API_URL}/${env.QR_APP_KEY}/urls`,
    reqeust,
  );
  return response.data;
};

const getSurveyQrCode = async (id: number) => {
  const response = await get<GetSurveyQrCodeResponse>(
    `${env.QR_API_URL}/${env.QR_APP_KEY}/domains/nh.nu/urls/${id}/qrcode`,
  );
  return response.data;
};

export const survey = {
  getSurveyList,
  postSurvey,
  deleteSurvey,
  getSurveyDetail,
  putSurvey,
  postResponses,
  postSurveyQrCode,
  getSurveyQrCode,
};
