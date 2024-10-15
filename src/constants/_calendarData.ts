import { CalendarInfo } from '@/type/mealType';

export const SUN_TO_SAT = ['일', '월', '화', '수', '목', '금', '토'];

export const MOCK_NEW_CALENDAR_NUTRITION: CalendarInfo = {
  '2024-10-14': {
    hospitalMenuId: 'hospital123',
    foods: [
      {
        foodId: '1',
        foodName: '쌀밥',
        kcal: 300,
        carbohydrate: 68,
        protein: 6,
        fat: 1,
      },
      {
        foodId: '2',
        foodName: '닭고기',
        kcal: 250,
        carbohydrate: 0,
        protein: 28,
        fat: 12,
      },
      {
        foodId: '3',
        foodName: '김치',
        kcal: 20,
        carbohydrate: 4,
        protein: 1,
        fat: 0,
      },
    ],
  },
  '2024-10-15': {
    hospitalMenuId: null,
    foods: [
      {
        foodId: '4',
        foodName: '떡볶이',
        kcal: 350,
        carbohydrate: 70,
        protein: 7,
        fat: 5,
      },
      {
        foodId: '5',
        foodName: '오뎅',
        kcal: 150,
        carbohydrate: 12,
        protein: 10,
        fat: 8,
      },
    ],
  },
};
