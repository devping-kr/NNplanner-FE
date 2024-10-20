import { patch, post } from '@/lib/axios';
import { Result } from '@/type/response';
import { PwRequest } from '@/type/user/userRequest';
import { USER_API } from '@/constants/_apiPath';

const checkPw = async (request: PwRequest) => {
  const response = await post<Result<null>>(USER_API.CHECK_PW, request);
  return response.data;
};

const editPw = async (request: PwRequest) => {
  const response = await patch<Result<null>>(USER_API.EDIT_PW, request);
  return response.data;
};

export const user = {
  checkPw,
  editPw,
};
