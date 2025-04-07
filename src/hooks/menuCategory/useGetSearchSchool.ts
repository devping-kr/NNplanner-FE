import { useQuery } from '@tanstack/react-query';
import { menuCategories } from '@/api/menuCategory';
import { GetSearchSchoolRequest } from '@/type/menuCategory/menuCategoryRequest';
import { menuCategoryKeys } from '@/hooks/menuCategory/queryKey';

export const useGetSearchSchool = (
  request: GetSearchSchoolRequest,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: menuCategoryKeys.searchSchool(request),
    queryFn: () => menuCategories.getSearchSchool(request),
    ...options,
  });
};
