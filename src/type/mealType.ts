import { FoodInfo } from '@/type/menu/menuResponse';

export type CalendarInfo = {
  [menuDate: string]: {
    menuId: string | null;
    foods: FoodInfo[];
  };
};
