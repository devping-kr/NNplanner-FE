import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { survey } from '@/api/survey';
import { Result } from '@/type/response';
import { PostSurveyRequest } from '@/type/survey/surveyRequest';
import { SurveyPostResponse } from '@/type/survey/surveyResponse';

export const usePostSurvey = (
  options?: UseMutationOptions<
    Result<SurveyPostResponse>,
    AxiosError<Result<SurveyPostResponse>>,
    PostSurveyRequest
  >,
) => {
  return useMutation<
    Result<SurveyPostResponse>,
    AxiosError<Result<SurveyPostResponse>>,
    PostSurveyRequest
  >({
    mutationFn: (request) => survey.postSurvey(request),
    ...options,
  });
};
