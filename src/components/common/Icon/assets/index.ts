import Calendar from '@/components/common/Icon/assets/Calendar';
import Chart from '@/components/common/Icon/assets/Chart';
import Logout from '@/components/common/Icon/assets/Logout';
import { colors } from '@/styles/colors';
import ArrowDown from './ArrowDown';
import ArrowNext from './ArrowNext';
import ArrowPrev from './ArrowPrev';
import Arrowup from './ArrowUp';
import Auto from './Auto';
import Dashboard from './Dashboard';
import Edit from './Edit';
import Search from './Search';
import Warning from './Warning';
import Xmark from './Xmark';

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
