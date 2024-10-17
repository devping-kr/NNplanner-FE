import { create } from 'zustand';
import { CalendarInfo } from '@/type/mealType';
import { SelectedCategory } from '@/type/menuCategory/category';

type MealPlanState = {
  monthMenuName: string;
  setMonthMenuName: (monthMenuName: string) => void;
  category: SelectedCategory;
  setCategory: (category: SelectedCategory) => void;
  calendar: CalendarInfo;
  setCalendar: (calendar: CalendarInfo) => void;
  year: number;
  setYear: (year: number) => void;
  month: number;
  setMonth: (month: number) => void;
};

export const useMealPlanStore = create<MealPlanState>((set) => ({
  monthMenuName: '',
  category: {} as SelectedCategory,
  calendar: {} as CalendarInfo,
  year: 1,
  month: 1,
  setMonthMenuName: (monthMenuName: string) =>
    set(() => ({
      monthMenuName,
    })),
  setCategory: (category: SelectedCategory) =>
    set(() => ({
      category,
    })),
  setCalendar: (calendar: CalendarInfo) =>
    set(() => ({
      calendar,
    })),
  setYear: (year: number) =>
    set(() => ({
      year,
    })),
  setMonth: (month: number) =>
    set(() => ({
      month,
    })),
}));
