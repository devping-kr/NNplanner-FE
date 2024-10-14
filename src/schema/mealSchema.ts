import { z } from 'zod';
import { MEAL_HEADER_ERROR } from '@/constants/_schema';

export const mealHeaderSchema = z.object({
  monthMenuName: z
    .string()
    .min(2, { message: MEAL_HEADER_ERROR.name.min })
    .max(20, { message: MEAL_HEADER_ERROR.name.max }),
});
