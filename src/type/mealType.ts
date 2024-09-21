export type CalendarNutritionData = {
  [date: string]: {
    id: string;
    content: string;
    kcal: number;
    carbs: number;
    protein: number;
    fat: number;
  }[];
};
