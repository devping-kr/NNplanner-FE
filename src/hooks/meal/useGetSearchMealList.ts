import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { meal } from '@/api/meal';
import { GetSearchMealListRequest } from '@/type/menu/menuRequest';
import { mealKeys } from '@/hooks/meal/queryKey';

export const useGetSearchMealList = (
  request: GetSearchMealListRequest,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: mealKeys.search(request),
    queryFn: () => meal.getSearchMealList(request),
    placeholderData: keepPreviousData,
    ...options,
  });
};
