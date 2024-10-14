import { get } from '@/lib/axios';
import { MajorCategory } from '@/type/menu/menuRequest';
import { Result } from '@/type/response';
import { MENU_CAGEGORY_API } from '@/constants/_apiPath';

const { MENU_CATEGORIES } = MENU_CAGEGORY_API;

const getMinorCategories = async (param: MajorCategory) => {
  const response = await get<Result<string[] | null>>(MENU_CATEGORIES, {
    params: {
      'major-category': param,
    },
  });
  return response.data;
};

export const menuCategories = {
  getMinorCategories,
};
