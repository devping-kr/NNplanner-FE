import { useQueryClient } from '@tanstack/react-query';
import { menuCategories } from '@/api/menuCategory';
import { CATEGORY_MAPPINGS } from '@/constants/_category';

export const usePrefetchMinorCategories = () => {
  const queryClient = useQueryClient();

  const prefetchMinorCategories = async () => {
    await Promise.all(
      CATEGORY_MAPPINGS.map(({ category, queryKey }) =>
        queryClient.prefetchQuery({
          queryKey: [queryKey],
          queryFn: () => menuCategories.getMinorCategories(category),
          staleTime: 1000 * 60 * 30,
        }),
      ),
    );
  };

  const hasCategories = CATEGORY_MAPPINGS.some(({ queryKey }) =>
    queryClient.getQueryData([queryKey]),
  );

  return { prefetchMinorCategories, hasCategories };
};
