import { create } from 'zustand';

type AutoPlanState = {
  monthMenuName: string;
  setMonthMenuName: (name: string) => void;
};

export const useAutoPlanStore = create<AutoPlanState>((set) => ({
  monthMenuName: '',
  setMonthMenuName: (name) => set({ monthMenuName: name }),
}));
