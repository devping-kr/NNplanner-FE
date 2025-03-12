import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { survey } from '@/api/survey';
import { GetSearchSurveyRequest } from '@/type/survey/surveyRequest';
import { surveyKeys } from '@/hooks/survey/queryKey';

export const useGetSurveyList = (request: GetSearchSurveyRequest) => {
  return useQuery({
    queryKey: surveyKeys.search(request),
    queryFn: () => survey.getSurveyList(request),
    placeholderData: keepPreviousData,
  });
};
