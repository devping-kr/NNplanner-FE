import { useQuery } from '@tanstack/react-query';
import { menu } from '@/api/menu';

export const useGetMenuCount = () => {
  return useQuery({
    queryKey: ['menuCount'],
    queryFn: () => menu.getMenuCount(),
  });
};
