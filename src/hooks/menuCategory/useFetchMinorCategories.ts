import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MajorCategory } from '@/type/menu/menuRequest';
import { Result } from '@/type/response';
import { Option } from '@/components/common/Selectbox';
import { MAJOR_CATEGORIES } from '@/constants/_meal';

export const useFetchMinorCategories = (majorCategory: MajorCategory | '') => {
  const queryClient = useQueryClient();
  const [minorCategories, setMinorCategories] = useState<Option[]>([]);

  useEffect(() => {
    const fetchCategories = () => {
      switch (majorCategory) {
        case MAJOR_CATEGORIES[0]:
          return queryClient.getQueryData<Result<string[]>>([
            'getSchoolMinorCategories',
          ]);
        case MAJOR_CATEGORIES[1]:
          return queryClient.getQueryData<Result<string[]>>([
            'getSchoolNameMinorCategories',
          ]);
        case MAJOR_CATEGORIES[2]:
          return queryClient.getQueryData<Result<string[]>>([
            'getHospitalMinorCategories',
          ]);
        default:
          return null;
      }
    };

    const categories = fetchCategories();
    if (!categories) return;
    const { data } = categories;
    if (!data) return;

    const formattedData = data.map((category) => ({
      value: category,
      label: category,
    }));

    setMinorCategories(formattedData);
  }, [majorCategory, queryClient]);

  return { minorCategories };
};
