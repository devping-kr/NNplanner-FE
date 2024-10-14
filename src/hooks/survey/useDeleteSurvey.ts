import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { survey } from '@/api/survey';
import { Result } from '@/type/response';

export const useDeleteSurvey = (
  options?: UseMutationOptions<Result<null>, AxiosError<Result<null>>, number>,
) => {
  return useMutation<Result<null>, AxiosError<Result<null>>, number>({
    mutationFn: (surveyId) => survey.deleteSurvey(surveyId),
    ...options,
  });
};
