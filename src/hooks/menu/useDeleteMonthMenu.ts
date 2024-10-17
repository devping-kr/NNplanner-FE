import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { menu } from '@/api/menu';
import { GetMonthMenuDetailRequest } from '@/type/menu/menuRequest';
import { Result } from '@/type/response';

export const useDeleteMonthMenu = () => {
  return useMutation<
    Result<null>,
    AxiosError<Result<null>>,
    GetMonthMenuDetailRequest
  >({
    mutationFn: (request: GetMonthMenuDetailRequest) =>
      menu.deleteMonthMenu(request),
  });
};
