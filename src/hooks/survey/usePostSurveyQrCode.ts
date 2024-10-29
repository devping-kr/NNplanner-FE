import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { survey } from '@/api/survey';
import { Result } from '@/type/response';
import { PostServeyQrCodeRequest } from '@/type/survey/surveyRequest';
import { PostSurveyQrCodeResponse } from '@/type/survey/surveyResponse';

export const usePostSurveyQrCode = (
  options?: UseMutationOptions<
    Result<PostSurveyQrCodeResponse>,
    AxiosError<Result<PostSurveyQrCodeResponse>>,
    PostServeyQrCodeRequest
  >,
) => {
  return useMutation<
    Result<PostSurveyQrCodeResponse>,
    AxiosError<Result<PostSurveyQrCodeResponse>>,
    PostServeyQrCodeRequest
  >({
    mutationFn: (request) => survey.postSurveyQrCode(request),
    ...options,
  });
};
