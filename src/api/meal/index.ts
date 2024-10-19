import { get } from '@/lib/axios';
import {
  GetMealListReqeust,
  GetSearchMealListRequest,
} from '@/type/menu/menuRequest';
import { MonthMenusResponse } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';
import { BASE_API } from '@/constants/_apiPath';

const getMealList = async ({
  size = 8,
  page,
  sort = 'createdAt,desc',
}: GetMealListReqeust) => {
  const response = await get<Result<MonthMenusResponse>>(BASE_API.MONTH_MENUS, {
    params: { page, sort, size },
  });
  return response.data;
};

const getSearchMealList = async ({
  size = 8,
  page,
  sort = 'createdAt,desc',
  majorCategory,
  minorCategory,
}: GetSearchMealListRequest) => {
  const response = await get<Result<MonthMenusResponse>>(
    `${BASE_API.MENU_CATEGORIES}${BASE_API.MONTH_MENUS}?major-category=${majorCategory}&minor-category=${minorCategory}`,
    {
      params: { page, sort, size },
    },
  );
  return response.data;
};

export const meal = { getMealList, getSearchMealList };
