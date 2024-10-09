import { MenuResponseDTO } from '@/type/menu/menuResponse';

/**
 * @description 소분류 목록 조회 response body
 */
export interface MenuMinorCategoryResponse {
  message: string;
  data: string[];
}

export interface MenuListByCategoriesResponseData {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  menuResponseDTOList: MenuResponseDTO[];
}

/**
 * @description 카테고리로 식단 전체 목록 조회 response body
 */
export interface MenuListByCategoriesResponse {
  message: string;
  data: MenuListByCategoriesResponseData;
}
