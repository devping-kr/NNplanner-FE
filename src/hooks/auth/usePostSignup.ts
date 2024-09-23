'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { auth } from '@/api/auth';

export interface UserRequest {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  loginType: 'LOCAL';
}

export const usePostSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: UserRequest) =>
      auth.signUp({ ...data, loginType: 'LOCAL' }),
    onSuccess: () => router.push('/'),
  });
};
