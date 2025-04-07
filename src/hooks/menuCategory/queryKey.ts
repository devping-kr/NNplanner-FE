import { GetSearchSchoolRequest } from '@/type/menuCategory/menuCategoryRequest';

export const menuCategoryKeys = {
  all: ['menu-categories'] as const,
  searchSchool: (request?: GetSearchSchoolRequest) =>
    [...menuCategoryKeys.all, request?.keyword] as const,
};
