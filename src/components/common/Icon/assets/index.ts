import ArrowDown from '@/components/common/Icon/assets/ArrowDown';
import ArrowNext from '@/components/common/Icon/assets/ArrowNext';
import ArrowPrev from '@/components/common/Icon/assets/ArrowPrev';
import Arrowup from '@/components/common/Icon/assets/ArrowUp';
import Auto from '@/components/common/Icon/assets/Auto';
import Calendar from '@/components/common/Icon/assets/Calendar';
import Chart from '@/components/common/Icon/assets/Chart';
import Danger from '@/components/common/Icon/assets/Danger';
import Dashboard from '@/components/common/Icon/assets/Dashboard';
import Edit from '@/components/common/Icon/assets/Edit';
import Hide from '@/components/common/Icon/assets/Hide';
import Normal from '@/components/common/Icon/assets/Info';
import Logout from '@/components/common/Icon/assets/Logout';
import Search from '@/components/common/Icon/assets/Search';
import Show from '@/components/common/Icon/assets/Show';
import Success from '@/components/common/Icon/assets/Success';
import Warning from '@/components/common/Icon/assets/Warning';
import Xmark from '@/components/common/Icon/assets/Xmark';
import { colors } from '@/styles/colors';
import ArrowNextBlock from './ArrowNextBlock';
import ArrowPrevBlock from './ArrowPrevBlock';

type IconMapEntry = {
  type: 'fill' | 'stroke';
  file: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ColorClassNames = {
  [group in 'white' | 'dark' | 'red' | 'green' | 'gray']: {
    [shade: number]: string;
  };
};

export const iconMap: Record<string, IconMapEntry> = {
  search: { type: 'stroke', file: Search },
  edit: { type: 'fill', file: Edit },
  xmark: { type: 'fill', file: Xmark },
  arrowUp: { type: 'stroke', file: Arrowup },
  arrowDown: { type: 'stroke', file: ArrowDown },
  arrowPrev: { type: 'stroke', file: ArrowPrev },
  arrowNext: { type: 'stroke', file: ArrowNext },
  arrowPrevBlock: { type: 'stroke', file: ArrowPrevBlock },
  arrowNextBlock: { type: 'stroke', file: ArrowNextBlock },
  dashboard: {
    type: 'stroke',
    file: Dashboard,
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
  warning: {
    type: 'stroke',
    file: Warning,
  },
  show: {
    type: 'stroke',
    file: Show,
  },
  hide: {
    type: 'stroke',
    file: Hide,
  },
  success: {
    type: 'stroke',
    file: Success,
  },
  normal: {
    type: 'stroke',
    file: Normal,
  },
  dander: {
    type: 'stroke',
    file: Danger,
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
};

export const COLORS = {
  warning: colors.red[100],
  white: colors.white[100],
  black: colors.dark[100],
  normal: colors.gray[500],
  success: colors.blue[200],
};

export type IconType = keyof typeof iconMap;
export type IconColor = keyof typeof COLORS;

type ColorGroup = keyof typeof COLOR_CLASSNAMES;
type ColorShade = keyof (typeof COLOR_CLASSNAMES)[ColorGroup];

export type HoverColor = `${ColorGroup}${ColorShade}`;

const getColorClass = (color?: HoverColor): string => {
  if (!color) return COLOR_CLASSNAMES.dark[100];

  const match = color.match(/^(\w+)(\d+)$/);
  if (!match) return COLOR_CLASSNAMES.gray[600];
  const [, group, shade] = match;

  return (
    COLOR_CLASSNAMES[group as ColorGroup]?.[shade as unknown as ColorShade] ||
    COLOR_CLASSNAMES.gray[600]
  );
};

export { COLOR_CLASSNAMES, getColorClass };
