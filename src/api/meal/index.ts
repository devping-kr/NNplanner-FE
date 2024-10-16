import { get } from '@/lib/axios';
import { GetMealListReqeust } from '@/type/menu/menuRequest';
import { MonthMenusResponse } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';
import { BASE_API } from '@/constants/_apiPath';

const getMealList = async ({
  size = 8,
  page,
  sort = 'createdAt,desc',
}: GetMealListReqeust) => {
  const response = await get<Result<MonthMenusResponse>>(
    `${BASE_API.MONTH_MENUS}`,
    { params: { page, sort, size } },
  );
  return response.data;
};

export const meal = { getMealList };
