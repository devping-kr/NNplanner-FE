import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { menu } from '@/api/menu';
import { MonthMenusSaveRequest } from '@/type/menu/menuRequest';
import { MenuResponseDTO } from '@/type/menu/menuResponse';
import { Result } from '@/type/response';

type PutMonthMenusVariables = {
  request: MonthMenusSaveRequest;
  monthMenuId: string;
};

export const usePutMonthMenus = () => {
  return useMutation<
    Result<MenuResponseDTO>,
    AxiosError<Result<null>>,
    PutMonthMenusVariables
  >({
    mutationFn: ({ request, monthMenuId }: PutMonthMenusVariables) =>
      menu.putMonthMenus(request, monthMenuId),
  });
};
