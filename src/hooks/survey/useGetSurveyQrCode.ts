import { useQuery } from '@tanstack/react-query';
import { survey } from '@/api/survey';
import { surveyKeys } from './queryKey';

export const useGetSurveyQrCode = (
  id: number,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: surveyKeys.qrCode(id),
    queryFn: () => survey.getSurveyQrCode(id),
    ...options,
  });
};
