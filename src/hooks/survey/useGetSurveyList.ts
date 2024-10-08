import { useQuery } from '@tanstack/react-query';
import { survey } from '@/api/survey';

export const useGetSurveyList = () => {
  return useQuery({
    queryKey: ['surveyList'],
    queryFn: () => survey.getSurveyList(),
  });
};
