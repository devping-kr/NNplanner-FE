import { useQuery } from '@tanstack/react-query';
import { meal } from '@/api/meal';
import { GetSearchMealListRequest } from '@/type/menu/menuRequest';
import { mealKeys } from '@/hooks/meal/queryKey';

export const useGetSearchMealList = (request: GetSearchMealListRequest) => {
  return useQuery({
    queryKey: mealKeys.search(request),
    queryFn: () => meal.getSearchMealList(request),
    enabled: !!request.majorCategory && !!request.minorCategory,
  });
};
