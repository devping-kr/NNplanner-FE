const TITLE = '냠냠 플래너';
const DESCRIPTION = '냠냠 플래너와 함께 더 편하게 식단 관리하세요!';
const SITE_URL = 'www.nnplanner.com';
const IMAGE_URL = 'https://i.ibb.co/QFXQj75K/01-fb.png';
const IMAGE_ALT = '냠냠 플래너 메타 이미지';
const IMAGE_SIZE = 800;

export const METADATA = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    '식단',
    '학교식단',
    '병원식단',
    '무료식단',
    '영양식단',
    '식단설문',
    '영양사',
    '급식',
    '단체급식',
  ],
  url: SITE_URL,
  images: [
    {
      url: IMAGE_URL,
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
      alt: IMAGE_ALT,
    },
  ],
};

const PLAN = '식단';
const AUTO_PLAN = '자동 식단';
const MENUAL_PLAN = '수동 식단';
const SURVEY = '설문';
const CHART = '결과';

const PAGE = '페이지';
const MAIN = '홈 대시보드';
const LIST = '목록 조회';
const DETAIL = '상세';
const DEFAULT = '작성';
const CREATE = '생성';
const EDIT = '수정';
const TAKE = '응답';

export const PAGE_METADATA = {
  MAIN: {
    title: `${MAIN} ${PAGE}`,
    description: `${MAIN} ${PAGE}입니다.`,
  },
  VIEWPLAN: {
    DETAIL: {
      title: `${PLAN} ${DETAIL} ${PAGE}`,
      description: `${PLAN} ${DETAIL} ${PAGE}입니다.`,
    },
    LIST: {
      title: `${PLAN} ${LIST} ${PAGE}`,
      description: `${PLAN} ${DETAIL} ${PAGE}입니다.`,
    },
    CREATE: {
      title: `${PLAN} ${CREATE} ${PAGE}`,
      description: `${PLAN} ${CREATE} ${PAGE}입니다.`,
    },
    EDIT: {
      title: `${PLAN} ${EDIT} ${PAGE}`,
      description: `${PLAN} ${EDIT} ${PAGE}입니다.`,
    },
  },
  VIEWCHART: {
    title: `${SURVEY} ${CHART} ${DETAIL} ${PAGE}`,
    description: `${SURVEY} ${CHART} ${DETAIL} ${PAGE}입니다.`,
  },
  AUTOPLAN: {
    DEFAULT: {
      title: `${AUTO_PLAN} ${DEFAULT} ${PAGE}`,
      description: `${AUTO_PLAN} ${DEFAULT} ${PAGE}입니다.`,
    },
    CREATE: {
      title: `${AUTO_PLAN} ${CREATE} ${PAGE}`,
      description: `${AUTO_PLAN} ${CREATE} ${PAGE}입니다.`,
    },
    EDIT: {
      title: `${AUTO_PLAN} ${EDIT} ${PAGE}`,
      description: `${AUTO_PLAN} ${EDIT} ${PAGE}입니다.`,
    },
  },
  MENUALPLAN: {
    DEFAULT: {
      title: `${MENUAL_PLAN} ${DEFAULT} ${PAGE}`,
      description: `${MENUAL_PLAN} ${DEFAULT} ${PAGE}입니다.`,
    },
    CREATE: {
      title: `${MENUAL_PLAN} ${CREATE} ${PAGE}`,
      description: `${MENUAL_PLAN} ${CREATE} ${PAGE}입니다.`,
    },
    EDIT: {
      title: `${MENUAL_PLAN} ${EDIT} ${PAGE}`,
      description: `${MENUAL_PLAN} ${EDIT} ${PAGE}입니다.`,
    },
  },
  SURVEY: {
    DEFAULT: {
      title: `${SURVEY} ${DEFAULT} ${PAGE}`,
      description: `${SURVEY} ${DEFAULT} ${PAGE}입니다.`,
    },
    CREATE: {
      title: `${SURVEY} ${CREATE} ${PAGE}`,
      description: `${SURVEY} ${CREATE} ${PAGE}입니다.`,
    },
    EDIT: {
      title: `${SURVEY} ${EDIT} ${PAGE}`,
      description: `${SURVEY} ${EDIT} ${PAGE}입니다.`,
    },
    TAKE: {
      title: `${SURVEY} ${TAKE} ${PAGE}`,
      description: `${SURVEY} ${TAKE} ${PAGE}입니다.`,
    },
  },
  MYPAGE: {
    title: `마이 ${PAGE}`,
    description: `마이 ${PAGE}입니다.`,
  },
};
