import { MajorCategory } from '@/type/menu/menuRequest';

/**
 * @description 음식 하나의 정보
 * 음식 검색 response body
 */
export interface FoodInfo {
  foodId: string;
  foodName: string;
  carbohydrate: number;
  protein: number;
  fat: number;
  kcal: number;
}

export type MenuIdType = 'hospitalMenuId' | 'schoolMenuId';
export type MenuKindType = 'hospitalMenuKind' | 'schoolMenuKind';

/**
 * @description 하루치 식단
 * 자동 식단 생성, 식단 개수 조회 response body
 */
// TODO: menuId, menuKind -> [key in MenuIdType]: string; 로 변경
export interface HospitalMenu {
  hospitalMenuId: string;
  hospitalMenuKind: string;
  foods: FoodInfo[];
}

/**
 * @description 학교 하루치 식단
 * 자동 식단 생성, 식단 개수 조회 response body
 */
export interface SchoolMenu {
  schoolMenuId: string;
  schoolMenuKind: string;
  foods: FoodInfo[];
}

/**
 * @description 식단 상세 조회, 수정 response body
 */
export interface MenuResponseDTO {
  userId: number;
  monthMenuId: string;
  majorCategory: MajorCategory;
  minorCategory: string;
  monthMenuName: string;
  createAt: string;
  //   TODO: 정확한 값으로 수정 필요. postman에서 빈 배열로 확인됨
  monthMenuList: HospitalMonthMenu[];
}

/**
 * @description 식단 전체 조회 response body
 */
export interface MonthMenusResponse {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  menuResponseDTOList: MenuResponseDTO[];
}

export interface HospitalMonthMenu {
  menuDate: string;
  hospitalMenuId: string;
  foodList: FoodInfo[];
}
