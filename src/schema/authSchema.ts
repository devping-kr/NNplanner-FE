import { z } from 'zod';
import { AUTH_ERROR } from '@/constants/_schema';

export const loginSchema = z.object({
  email: z.string().email({ message: AUTH_ERROR.email }),
  password: z.string().min(8, { message: AUTH_ERROR.password }),
});
