import { create } from 'zustand';
import { CalendarInfo } from '@/type/mealType';
import { SelectedCategory } from '@/type/menuCategory/category';

type MenualPlanState = {
  monthMenuName: string;
  setMonthMenuName: (name: string) => void;
  category: SelectedCategory;
  setCategory: (category: SelectedCategory) => void;
  calendar: CalendarInfo;
  setCalendar: (calendar: CalendarInfo) => void;
};

export const useMenualPlanStore = create<MenualPlanState>((set) => ({
  monthMenuName: '',
  category: {} as SelectedCategory,
  calendar: {} as CalendarInfo,
  setMonthMenuName: (name: string) =>
    set(() => ({
      monthMenuName: name,
    })),
  setCategory: (category: SelectedCategory) =>
    set(() => ({
      category: category,
    })),
  setCalendar: (calendar: CalendarInfo) =>
    set(() => ({
      calendar: calendar,
    })),
}));
