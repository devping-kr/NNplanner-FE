import { get, post, put } from '@/lib/axios';
import {
  GetFoodsRequest,
  MonthMenusAutoRequest,
  MonthMenusSaveRequest,
} from '@/type/menu/menuRequest';
import { FoodInfo, MenuResponseDTO } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';
import { MENUS_API } from '@/constants/_apiPath';

const { AUTO, SAVE, FOODS, MONTH_MENUS } = MENUS_API;

const postMonthMenusAuto = async (request: MonthMenusAutoRequest) => {
  const response = await post<Result<null>>(AUTO, request);
  return response.data;
};

const postMonthMenusSave = async (request: MonthMenusSaveRequest) => {
  const response = await post<Result<null>>(SAVE, request);
  return response.data;
};

const putMonthMenus = async (
  request: MonthMenusSaveRequest,
  monthMenuId: string,
) => {
  const response = await put<Result<MenuResponseDTO>>(
    `${MONTH_MENUS}/${monthMenuId}`,
    request,
  );
  return response.data;
};

const getFoodList = async ({ foodName, page, size }: GetFoodsRequest) => {
  const response = await get<Result<FoodInfo[]>>(FOODS, {
    params: {
      foodName,
      page,
      size,
    },
  });
  return response.data;
};

export const menu = {
  postMonthMenusAuto,
  postMonthMenusSave,
  putMonthMenus,
  getFoodList,
};
