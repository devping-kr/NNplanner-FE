import { SelectedCategory } from '@/type/menuCategory/category';

/**
 * @description 식단 대분류 카테고리
 */
export type MajorCategory = '학교' | '학교명' | '병원';

/**
 * @description 자동 식단 생성 request body
 */
export interface MonthMenusAutoRequest extends SelectedCategory {
  dayCount: number;
}

/**
 * @description 병원 하루 식단
 */
export interface HospitalAutoDayMenus {
  hospitalMenuId: string | null;
  menuDate: string; // '2024-09-25'
  food1: string | null;
  food2: string | null;
  food3: string | null;
  food4: string | null;
  food5: string | null;
  food6: string | null;
  food7: string | null;
}

/**
 * @description 식단 저장, 수정 request body
 */
export interface MonthMenusSaveRequest {
  monthMenuName: string;
  majorCategory: MajorCategory;
  minorCategory: string;
  monthMenusSaveList: HospitalAutoDayMenus[];
}

export interface GetFoodsRequest {
  foodName: string;
}
