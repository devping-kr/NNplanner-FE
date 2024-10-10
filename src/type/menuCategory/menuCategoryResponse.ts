import { MenuResponseDTO } from '@/type/menu/menuResponse';

/**
 * @description 카테고리로 식단 전체 목록 조회 response body
 */
export interface MenuListByCategoriesResponse {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  menuResponseDTOList: MenuResponseDTO[];
}
