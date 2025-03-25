import { get } from '@/lib/axios';
import { MajorCategory } from '@/type/menu/menuRequest';
import { GetSearchSchoolRequest } from '@/type/menuCategory/menuCategoryRequest';
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

/**
 * @description 학교명 검색 api
 */
const getSearchSchool = async ({ keyword }: GetSearchSchoolRequest) => {
  const response = await get<Result<string[]>>(MENU_CATEGORIES, {
    params: {
      keyword,
    },
  });
  return response.data;
};

export const menuCategories = {
  getMinorCategories,
  getSearchSchool,
};
