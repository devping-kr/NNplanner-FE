import { useQuery } from '@tanstack/react-query';
import { survey } from '@/api/survey';
import { surveyKeys } from '@/hooks/survey/queryKey';

export const useGetSurveyDetail = (surveyId: number) => {
  return useQuery({
    queryKey: surveyKeys.detail(surveyId),
    queryFn: () => survey.getSurveyDetail(surveyId),
  });
};
