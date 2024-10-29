import { get } from '@/lib/axios';
import { MenuRecipeListResponse } from '@/type/openAPI/recipeResponse';
import { Result } from '@/type/response';
import { OPEN_API } from '@/constants/_apiPath';

const { RECIPE } = OPEN_API;

const getMonthRecipeList = async () => {
  const response = await get<Result<MenuRecipeListResponse[]>>(RECIPE);
  return response.data;
};

export const openAPI = {
  getMonthRecipeList,
};
