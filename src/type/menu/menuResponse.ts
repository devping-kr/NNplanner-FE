import { HospitalMinorCategory, MajorCategory } from '@/type/menu/menuRequest';

/**
 * @description 음식 하나의 정보
 * 음식 검색 response body
 */
export interface FoodInfo {
  foodId: string;
  foodName: string;
  carbohydrate: string;
  protein: string;
  fat: string;
  kcal: string;
}

/**
 * @description 병원 하루치 식단
 * 자동 식단 생성, 식단 개수 조회 response body
 */
export interface HospitalMenu {
  hospitalMenuId: string;
  hospitalMenuKind: HospitalMinorCategory;
  foods: FoodInfo[];
}

/**
 * @description 식단 상세 조회, 수정 response body
 */
export interface MenuResponseDTO {
  userId: number;
  monthMenuId: string;
  majorCategory: MajorCategory;
  //   TODO: 학교 minorCategory도 유니온으로 추가 필요
  minorCategory: HospitalMinorCategory;
  monthMenuName: string;
  createAt: string;
  //   TODO: 정확한 값으로 수정 필요. postman에서 빈 배열로 확인됨
  monthMenuList: string[] | HospitalMonthMenu[];
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
