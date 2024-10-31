import { get } from '@/lib/axios';
import {
  GetMealListReqeust,
  GetSearchMealListRequest,
} from '@/type/menu/menuRequest';
import { MonthMenusResponse } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';
import { MENUS_API } from '@/constants/_apiPath';

const { MONTH_MENUS, SEARCH } = MENUS_API;

const getMealList = async ({
  size = 8,
  page,
  sort = 'createdAt,desc',
}: GetMealListReqeust) => {
  const response = await get<Result<MonthMenusResponse>>(MONTH_MENUS, {
    params: { page, sort, size },
  });
  return response.data;
};

const getSearchMealList = async ({
  majorCategory,
  minorCategory,
  menuName,
  year,
  month,
  size = 8,
  page,
  sort = 'createdAt,desc',
}: GetSearchMealListRequest) => {
  const response = await get<Result<MonthMenusResponse>>(SEARCH, {
    params: {
      ...(majorCategory != null && { majorCategory }),
      ...(minorCategory != null && { minorCategory }),
      ...(menuName != null && { menuName }),
      ...(year != null && { year }),
      ...(month != null && { month }),
      page,
      sort,
      size,
    },
  });
  return response.data;
};

export const meal = { getMealList, getSearchMealList };
