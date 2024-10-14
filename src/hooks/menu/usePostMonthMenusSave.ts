import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { menu } from '@/api/menu';
import { MonthMenusSaveRequest } from '@/type/menu/menuRequest';
import { Result } from '@/type/response';

export const usePostMonthMenusSave = () => {
  return useMutation<
    Result<null>,
    AxiosError<Result<null>>,
    MonthMenusSaveRequest
  >({
    mutationFn: (request: MonthMenusSaveRequest) =>
      menu.postMonthMenusSave(request),
  });
};
