import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { menu } from '@/api/menu';
import { GetFoodsRequest } from '@/type/menu/menuRequest';
import { FoodInfo } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';

export const useGetFoods = () => {
  return useMutation<
    Result<FoodInfo[]>,
    AxiosError<Result<null>>,
    GetFoodsRequest
  >({
    mutationFn: (request: GetFoodsRequest) => menu.getFoods(request),
  });
};
