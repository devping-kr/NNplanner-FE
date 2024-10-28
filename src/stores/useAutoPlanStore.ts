import { create } from 'zustand';
import { SelectedCategory } from '@/type/menuCategory/category';

type AutoPlanState = {
  monthMenuName: string;
  category: SelectedCategory;
  setMonthMenuName: (name: string) => void;
  setCategory: (category: SelectedCategory) => void;
};

export const useAutoPlanStore = create<AutoPlanState>((set) => ({
  monthMenuName: '',
  category: {
    majorCategory: '학교',
    minorCategory: '',
  },
  setMonthMenuName: (name: string) => set({ monthMenuName: name }),
  setCategory: (category: SelectedCategory) =>
    set(() => ({
      category: category,
    })),
}));
