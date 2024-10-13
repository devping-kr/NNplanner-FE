import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { survey } from '@/api/survey';
import { GetSearchSurveyRequest } from '@/type/survey/surveyRequest';
import { surveyKeys } from '@/hooks/survey/queryKey';

export const useGetSurveyList = (request: GetSearchSurveyRequest) => {
  const searchParam = useSearchParams();
  const tab = searchParam.get('tab') as string;
  const currentTab = tab ?? ('전체' as string);

  return useQuery({
    queryKey: surveyKeys.search(request),
    queryFn: () => survey.getSurveyList(request),
    select: (data) => {
      const filteredSurveys = data.data.surveys.filter((survey) => {
        if (currentTab === '진행중') {
          return survey.state === 'IN_PROGRESS';
        }
        if (currentTab === '마감') {
          return survey.state === 'CLOSED';
        }
        return true;
      });

      return {
        ...data.data,
        surveys: filteredSurveys,
      };
    },
  });
};
