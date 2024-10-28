import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { survey } from '@/api/survey';
import { Result } from '@/type/response';
import { PostServeyResponsesRequest } from '@/type/survey/surveyRequest';
import { PostSurveyResponsesResponse } from '@/type/survey/surveyResponse';

export const usePostSurveyResponses = (
  id: number,
  options?: UseMutationOptions<
    Result<PostSurveyResponsesResponse>,
    AxiosError<Result<PostSurveyResponsesResponse>>,
    PostServeyResponsesRequest
  >,
) => {
  return useMutation<
    Result<PostSurveyResponsesResponse>,
    AxiosError<Result<PostSurveyResponsesResponse>>,
    PostServeyResponsesRequest
  >({
    mutationFn: (request) => survey.postResponses(id, request),
    ...options,
  });
};
