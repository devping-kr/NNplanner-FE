import ArrowDown from './ArrowDown';
import Arrowup from './ArrowUp';
import Edit from './Edit';
import Search from './Search';
import Xmark from './Xmark';

export const iconMap = {
  search: Search,
  edit: Edit,
  xmark: Xmark,
  arrowUp: Arrowup,
  arrowDown: ArrowDown,
};

export const COLORS = {
  warning: '#ff0000',
  white: '#ffffff',
  black: '#000000',
};

export type IconType = keyof typeof iconMap;
export type IconColor = keyof typeof COLORS;
