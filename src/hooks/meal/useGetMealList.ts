import { useQuery } from '@tanstack/react-query';
import { meal } from '@/api/meal';
import { GetMealListReqeust } from '@/type/menu/menuRequest';
import { mealKeys } from './queryKey';

export const useGetMealList = (request: GetMealListReqeust) => {
  return useQuery({
    queryKey: mealKeys.sort(request),
    queryFn: () => meal.getMealList(request),
  });
};
