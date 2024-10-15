import { useQuery } from '@tanstack/react-query';
import { menu } from '@/api/menu';
import { GetFoodsRequest } from '@/type/menu/menuRequest';

export const useGetFoods = (
  request: GetFoodsRequest,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: ['foods', request?.foodName, request?.page, request?.size],
    queryFn: () => menu.getFoods(request),
    ...options,
  });
};
