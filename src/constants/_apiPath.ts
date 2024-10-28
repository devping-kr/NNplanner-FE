/**
 * @description base API endpoints
 */
export const BASE_API = {
  AUTHS: '/auths',
  SURVEYS: '/surveys',
  MONTH_MENUS: '/month-menus',
  MENU_CATEGORIES: '/menu-categories',
  USERS: '/users',
};

/**
 * @description auth API endpoints
 */
export const AUTH_API = {
  SIGNUP: `${BASE_API.AUTHS}/signup`,
  SEND: `${BASE_API.AUTHS}/send`,
  VERIFY: `${BASE_API.AUTHS}/verify`,
  LOGIN: `${BASE_API.AUTHS}/login`,
  REISSUE: `${BASE_API.AUTHS}/reissue`,
  LOGOUT: `${BASE_API.AUTHS}/logout`,
};

/**
 * @description 설문(survey) API endpoints, param
 */
export const SURVEY_API = {
  SURVEYS: BASE_API.SURVEYS,
  SORT: 'sort',
  RESPONSES: '/responses',
};

/**
 * @description  식단(menu) API endpoints, param
 */
export const MENUS_API = {
  MONTH_MENUS: BASE_API.MONTH_MENUS,
  AUTO: `${BASE_API.MONTH_MENUS}/auto`,
  SAVE: `${BASE_API.MONTH_MENUS}/save`,
  FOODS: `${BASE_API.MONTH_MENUS}/foods`,
  FOOD_NAME: 'foodName',
  ALL_COUNT: `${BASE_API.MONTH_MENUS}/count`,
};

/**
 * @description 메뉴 카테고리 API endpoints, param
 */
export const MENU_CAGEGORY_API = {
  MENU_CATEGORIES: BASE_API.MENU_CATEGORIES,
  MAJOR_CATEGORY: 'major-category',
  MINOR_CATEGORY: 'minor-category',
};

/**
 * @description user API endpoints
 */
export const USER_API = {
  USERS: BASE_API.USERS,
  CHECK_PW: `${BASE_API.USERS}/check-pw`,
  EDIT_PW: `${BASE_API.USERS}/edit-pw`,
};
