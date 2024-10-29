import { useQuery } from '@tanstack/react-query';
import { openAPI } from '@/api/openAPI';

export const useGetMenuRecipeList = () => {
  return useQuery({
    queryKey: ['menuRecipeList'],
    queryFn: () => openAPI.getMonthRecipeList(),
  });
};
