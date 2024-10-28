import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { survey } from '@/api/survey';
import { Result } from '@/type/response';
import { PutSurveyRequest } from '@/type/survey/surveyRequest';
import { PutSurveyResponse } from '@/type/survey/surveyResponse';

export const usePutSurvey = (
  id: number,
  options?: UseMutationOptions<
    Result<PutSurveyResponse>,
    AxiosError<Result<PutSurveyResponse>>,
    PutSurveyRequest
  >,
) => {
  return useMutation<
    Result<PutSurveyResponse>,
    AxiosError<Result<PutSurveyResponse>>,
    PutSurveyRequest
  >({
    mutationFn: (request) => survey.putSurvey(id, request),
    ...options,
  });
};
