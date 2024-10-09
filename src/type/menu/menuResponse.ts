import { HospitalMinorCategory, MajorCategory } from '@/type/menu/menuRequest';

/**
 * @description 음식 하나의 정보
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
 */
export interface HospitalMenu {
  hospitalMenuId: string;
  hospitalMenuKind: HospitalMinorCategory;
  foods: FoodInfo[];
}

/**
 * @description 자동 식단 생성 response body
 */
export interface MonthMenusAutoResponse {
  message: string;
  data: HospitalMenu[];
}

/**
 * @description 식단 저장, 삭제 response body
 */
export interface MonthMenusSaveResponse {
  message: string;
  data: null;
}

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

export interface MonthMenusResponseData {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  menuResponseDTOList: MenuResponseDTO[];
}

/**
 * @description 식단 전체 조회 response body
 */
export interface MonthMenusResponse {
  message: string;
  data: MonthMenusResponseData;
}

export interface HospitalMonthMenu {
  menuDate: string;
  hospitalMenuId: string;
  foodList: FoodInfo[];
}

/**
 * @description 식단 상세 조회, 수정 response body
 */
export interface MonthMenusDetailResponse {
  message: string;
  data: MenuResponseDTO;
}

/**
 * @description 음식 검색 response body
 */
export interface MonthMenusSearchResponse {
  message: string;
  data: FoodInfo[];
}

/**
 * @description 식단 개수 조회 response body
 */
export interface MonthMenusCountResponse {
  message: string;
  data: FoodInfo[];
}
