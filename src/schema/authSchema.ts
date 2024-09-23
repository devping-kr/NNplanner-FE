import { z } from 'zod';
import { AUTH_ERROR } from '@/constants/_schema';

const baseAuthSchema = z.object({
  email: z.string().email({ message: AUTH_ERROR.base.email }),
  password: z.string().min(8, { message: AUTH_ERROR.base.password }),
});

export const loginSchema = baseAuthSchema;

export const signUpSchema = baseAuthSchema
  .extend({
    username: z.string().min(2, { message: AUTH_ERROR.signup.username }),
    passwordConfirm: z.string().min(8, { message: AUTH_ERROR.base.password }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['passwordConfirm'],
      });
    }
  });
