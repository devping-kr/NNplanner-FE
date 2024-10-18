import { useQuery } from '@tanstack/react-query';
import { menu } from '@/api/menu';
import { GetMonthMenuDetailRequest } from '@/type/menu/menuRequest';

export const useGetMonthMenuDetails = (request: GetMonthMenuDetailRequest) => {
  return useQuery({
    queryKey: ['monthMenuDetail', request.monthMenuId],
    queryFn: () => menu.getMonthMenuDetail(request),
  });
};
