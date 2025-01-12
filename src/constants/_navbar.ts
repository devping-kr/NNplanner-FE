export const BASE_ROUTES = {
  MAIN: '/main',
  AUTO: '/autoPlan',
  MENUAL: '/menualPlan',
  VIEW_PLAN: '/viewPlan',
  VIEW_CHART: '/viewChart',
  SURVEY: '/survey',
  CREATE: '/create',
  EDIT: '/edit',
  TAKE: '/take',
  SIGNUP: '/signup',
  LOGIN: '/login',
  MY_PAGE: '/myPage',
};

/**
 * @description 네비게이션 페이지 이름, 경로, 아이콘 이름
 */
export const NAV_LINKS = [
  {
    name: '홈 대시보드',
    href: BASE_ROUTES.MAIN,
    icon: 'dashboard',
  },
  {
    name: '자동 식단 작성',
    href: BASE_ROUTES.AUTO,
    icon: 'auto',
  },
  {
    name: '수동 식단 작성',
    href: BASE_ROUTES.MENUAL,
    icon: 'calendar',
  },
  {
    name: '식단 조회',
    href: BASE_ROUTES.VIEW_PLAN,
    icon: 'navSearch',
  },
  {
    name: '설문 결과 조회',
    href: BASE_ROUTES.VIEW_CHART,
    icon: 'chart',
  },
];

const createRoutes = (baseRoutes: typeof BASE_ROUTES) => ({
  CREATE: {
    AUTO: `${baseRoutes.AUTO}${baseRoutes.CREATE}`,
    MENUAL: `${baseRoutes.MENUAL}${baseRoutes.CREATE}`,
  },
  EDIT: {
    AUTO: `${baseRoutes.AUTO}${baseRoutes.EDIT}`,
    MENUAL: `${baseRoutes.MENUAL}${baseRoutes.EDIT}`,
    EDIT: baseRoutes.EDIT,
  },
  VIEW: {
    PLAN: baseRoutes.VIEW_PLAN,
    CHART: baseRoutes.VIEW_CHART,
  },
  SURVEY: {
    CREATE: `${baseRoutes.SURVEY}${baseRoutes.CREATE}`,
    EDIT: `${baseRoutes.SURVEY}${baseRoutes.EDIT}`,
    TAKE: `${baseRoutes.SURVEY}${baseRoutes.TAKE}`,
  },
  AUTO_PLAN: baseRoutes.AUTO,
  MENUAL_PLAN: baseRoutes.MENUAL,
});

export const ROUTES = createRoutes(BASE_ROUTES);
