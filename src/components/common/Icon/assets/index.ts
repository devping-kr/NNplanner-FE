import ArrowDown from '@/components/common/Icon/assets/ArrowDown';
import ArrowNext from '@/components/common/Icon/assets/ArrowNext';
import ArrowNextBlock from '@/components/common/Icon/assets/ArrowNextBlock';
import ArrowPrev from '@/components/common/Icon/assets/ArrowPrev';
import ArrowPrevBlock from '@/components/common/Icon/assets/ArrowPrevBlock';
import Arrowup from '@/components/common/Icon/assets/ArrowUp';
import Auto from '@/components/common/Icon/assets/Auto';
import Calendar from '@/components/common/Icon/assets/Calendar';
import Chart from '@/components/common/Icon/assets/Chart';
import CheckCircle from '@/components/common/Icon/assets/CheckCircle';
import Danger from '@/components/common/Icon/assets/Danger';
import Dashboard from '@/components/common/Icon/assets/Dashboard';
import Edit from '@/components/common/Icon/assets/Edit';
import Envelope from '@/components/common/Icon/assets/Envelope';
import Google from '@/components/common/Icon/assets/Google';
import Group from '@/components/common/Icon/assets/Group';
import Hide from '@/components/common/Icon/assets/Hide';
import Normal from '@/components/common/Icon/assets/Info';
import InfoCircle from '@/components/common/Icon/assets/InfoCircle';
import Logout from '@/components/common/Icon/assets/Logout';
import NavSearch from '@/components/common/Icon/assets/NavSearch';
import Pencil from '@/components/common/Icon/assets/Pencil';
import Plus from '@/components/common/Icon/assets/Plus';
import Profile from '@/components/common/Icon/assets/Profile';
import Search from '@/components/common/Icon/assets/Search';
import Show from '@/components/common/Icon/assets/Show';
import Time from '@/components/common/Icon/assets/Time';
import TrendDown from '@/components/common/Icon/assets/TrendDown';
import TrendUp from '@/components/common/Icon/assets/TrendUp';
import User from '@/components/common/Icon/assets/User';
import WarnCircle from '@/components/common/Icon/assets/WarnCircle';
import Xmark from '@/components/common/Icon/assets/Xmark';
import { colors } from '@/styles/colors';

type IconMapEntry = {
  type: 'fill' | 'stroke';
  file: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ColorClassNames = {
  [group in 'white' | 'dark' | 'red' | 'green' | 'gray' | 'grey' | 'black']: {
    [shade: number]: string;
  };
};

export const iconMap: Record<string, IconMapEntry> = {
  search: { type: 'fill', file: Search },
  edit: { type: 'fill', file: Edit },
  xmark: { type: 'fill', file: Xmark },
  plus: { type: 'stroke', file: Plus },
  arrowUp: { type: 'fill', file: Arrowup },
  arrowDown: { type: 'fill', file: ArrowDown },
  arrowPrev: { type: 'fill', file: ArrowPrev },
  arrowNext: { type: 'fill', file: ArrowNext },
  arrowPrevBlock: { type: 'fill', file: ArrowPrevBlock },
  arrowNextBlock: { type: 'fill', file: ArrowNextBlock },
  dashboard: {
    type: 'stroke',
    file: Dashboard,
  },
  user: {
    type: 'stroke',
    file: User,
  },
  envelope: {
    type: 'stroke',
    file: Envelope,
  },
  google: {
    type: 'fill',
    file: Google,
  },
  auto: { type: 'stroke', file: Auto },
  chart: { type: 'stroke', file: Chart },
  logout: {
    type: 'stroke',
    file: Logout,
  },
  calendar: {
    type: 'stroke',
    file: Calendar,
  },
  show: {
    type: 'stroke',
    file: Show,
  },
  hide: {
    type: 'stroke',
    file: Hide,
  },
  normal: {
    type: 'stroke',
    file: Normal,
  },
  danger: {
    type: 'stroke',
    file: Danger,
  },
  trendUp: {
    type: 'fill',
    file: TrendUp,
  },
  trendDown: {
    type: 'fill',
    file: TrendDown,
  },
  time: {
    type: 'fill',
    file: Time,
  },
  group: {
    type: 'fill',
    file: Group,
  },
  profile: {
    type: 'stroke',
    file: Profile,
  },
  // 리디자인 후 추가된 아이콘
  success: {
    type: 'stroke',
    file: CheckCircle,
  },
  info: {
    type: 'stroke',
    file: InfoCircle,
  },
  warning: {
    type: 'stroke',
    file: WarnCircle,
  },
  navSearch: {
    type: 'stroke',
    file: NavSearch,
  },
  pencil: {
    type: 'stroke',
    file: Pencil,
  },
};

const COLOR_CLASSNAMES: ColorClassNames = {
  white: {
    100: 'white-100',
    200: 'white-200',
  },
  dark: {
    100: 'dark-100',
  },
  black: {
    100: 'black-100',
  },
  red: {
    100: 'red-100',
    200: 'red-200',
    300: 'red-300',
  },
  green: {
    100: 'green-100',
    200: 'green-200',
    300: 'green-300',
    400: 'green-400',
    500: 'green-500',
    600: 'green-600',
    700: 'green-700',
    800: 'green-800',
  },
  gray: {
    100: 'gray-100',
    200: 'gray-200',
    300: 'gray-300',
    400: 'gray-400',
    500: 'gray-500',
    600: 'gray-600',
    700: 'gray-700',
    800: 'gray-800',
  },
  grey: {
    200: 'grey-200',
  },
};

export const COLORS = {
  // 리디자인 색상 적용
  warning: colors.red[500],
  black: colors.black[100],
  grey: colors.grey[200],
  grey100: colors.grey[100],
  grey300: colors.grey[300],
  grey500: colors.grey[500],
  green500: colors.green[500],
  grey900: colors.grey[900],
  //---
  // 기존 아이콘 색상
  white: colors.white[100],
  normal: colors.gray[500],
  success: colors.blue[200],
  active: colors.green[800],
};

export type IconType = keyof typeof iconMap;
export type IconColor = keyof typeof COLORS;

type ColorGroup = keyof typeof COLOR_CLASSNAMES;
type ColorShade = keyof (typeof COLOR_CLASSNAMES)[ColorGroup];

export type HoverColor = `${ColorGroup}${ColorShade}`;

const getColorClass = (color?: HoverColor): string => {
  if (!color) return COLOR_CLASSNAMES.black[100];

  const match = color.match(/^(\w+)(\d+)$/);
  if (!match) return COLOR_CLASSNAMES.gray[600];
  const [, group, shade] = match;

  return (
    COLOR_CLASSNAMES[group as ColorGroup]?.[shade as unknown as ColorShade] ||
    COLOR_CLASSNAMES.gray[600]
  );
};

export { COLOR_CLASSNAMES, getColorClass };
