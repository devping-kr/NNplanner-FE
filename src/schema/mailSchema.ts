import { z } from 'zod';
import { MAIL_ERROR } from '@/constants/_schema';

export const mailSchema = z.object({
  user_name: z
    .string()
    .min(2, { message: MAIL_ERROR.user_name.min })
    .max(8, { message: MAIL_ERROR.user_name.max }),
  message: z
    .string()
    .min(0, { message: MAIL_ERROR.message.min })
    .max(600, { message: MAIL_ERROR.message.max }),
  user_email: z.string().email({ message: MAIL_ERROR.user_email }),
});
