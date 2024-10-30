import { useQuery } from '@tanstack/react-query';
import { menu } from '@/api/menu';
import { GetMonthMenuDetailRequest } from '@/type/menu/menuRequest';
import { THIRTY_MINUTES } from '@/hooks/menuCategory/usePrefetchMinorCategories';

export const useGetMonthMenuDetails = (
  request: GetMonthMenuDetailRequest,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: ['monthMenuDetail', request.monthMenuId],
    queryFn: () => menu.getMonthMenuDetail(request),
    staleTime: THIRTY_MINUTES,
    ...options,
  });
};
