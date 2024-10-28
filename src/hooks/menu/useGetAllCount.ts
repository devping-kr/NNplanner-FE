import { useQuery } from '@tanstack/react-query';
import { menu } from '@/api/menu';

export const useGetAllCount = () => {
  return useQuery({
    queryKey: ['allCount'],
    queryFn: () => menu.getAllCount(),
  });
};
