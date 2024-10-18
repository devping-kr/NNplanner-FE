import {
  GetMealListReqeust,
  GetSearchMealListRequest,
} from '@/type/menu/menuRequest';

export const mealKeys = {
  all: ['meals'] as const,

  lists: () => [...mealKeys.all, 'list'] as const,
  sort: (request?: GetMealListReqeust) =>
    [...mealKeys.lists(), request] as const,
  search: (request?: GetSearchMealListRequest) =>
    [...mealKeys.lists(), request] as const,
};
