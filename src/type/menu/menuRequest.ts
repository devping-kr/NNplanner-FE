import { SelectedCategory } from '@/type/menuCategory/category';
import { MAJOR_CATEGORIES } from '@/constants/_meal';

/**
 * @description 식단 대분류 카테고리
 */
export type MajorCategory = (typeof MAJOR_CATEGORIES)[number];

/**
 * @description 자동 식단 생성 request body
 */
export interface MonthMenusAutoRequest extends SelectedCategory {
  dayCount: number;
}

/**
 * @description 병원 하루 식단
 */
export interface AutoDayMenus {
  menuId: string | null;
  menuDate: string;
  food1: string;
  food2: string;
  food3: string;
  food4: string;
  food5: string;
  food6: string;
  food7: string;
}

/**
 * @description 식단 저장, 수정 request body
 */
export interface MonthMenusSaveRequest {
  monthMenuName: string;
  majorCategory: MajorCategory;
  minorCategory: string;
  monthMenusSaveList: AutoDayMenus[];
}

export interface GetFoodsRequest {
  foodName: string;
  page: number;
  size: number;
}

export interface GetMealListReqeust {
  page: number;
  size: number;
  sort: 'createdAt,desc' | 'createdAt,asc';
}

export interface GetSearchMealListRequest extends GetMealListReqeust {
  majorCategory: string;
  minorCategory: string;
}

export interface GetMonthMenuDetailRequest {
  monthMenuId: string;
}
