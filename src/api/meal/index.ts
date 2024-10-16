import { get } from '@/lib/axios';
import { GetMealListReqeust } from '@/type/menu/menuRequest';
import { MonthMenusResponse } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';
import { BASE_API } from '@/constants/_apiPath';

const getMealList = async ({
  page,
  sort = 'createdAt,desc',
}: GetMealListReqeust) => {
  const response = await get<Result<MonthMenusResponse>>(
    `${BASE_API.MONTH_MENUS}`,
    { params: { page, sort } },
  );
  return response.data;
};

export const meal = { getMealList };
