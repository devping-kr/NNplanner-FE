import { FoodInfo } from '@/type/menu/menuResponse';

export type CalendarInfo = {
  [menuDate: string]: {
    hospitalMenuId: string | null;
    foods: FoodInfo[];
  };
};
