import { z } from 'zod';
import { AUTH_ERROR } from '@/constants/_schema';

const baseAuthSchema = z.object({
  email: z.string().email({ message: AUTH_ERROR.base.email }),
  password: z.string().min(8, { message: AUTH_ERROR.base.password }),
});

export const loginSchema = baseAuthSchema;

export const signUpSchema = baseAuthSchema
  .extend({
    name: z.string().min(2, { message: AUTH_ERROR.signup.name }),
    passwordConfirm: z.string().min(8, { message: AUTH_ERROR.base.password }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: AUTH_ERROR.signup.passwordConfirm,
        path: ['passwordConfirm'],
      });
    }
  });

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: AUTH_ERROR.base.password })
      .max(16, { message: AUTH_ERROR.base.password })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, AUTH_ERROR.base.password),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: AUTH_ERROR.signup.passwordConfirm,
  });
