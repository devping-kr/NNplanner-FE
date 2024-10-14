import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { menu } from '@/api/menu';
import { MonthMenusAutoRequest } from '@/type/menu/menuRequest';
import { Result } from '@/type/response';

export const usePostMonthMenusAuto = () => {
  return useMutation<
    Result<null>,
    AxiosError<Result<null>>,
    MonthMenusAutoRequest
  >({
    mutationFn: (request: MonthMenusAutoRequest) =>
      menu.postMonthMenusAuto(request),
  });
};
