import { cn } from '@/utils/core';
import {
  iconMap,
  IconType,
  HoverColor,
  COLORS,
  getColorClass,
  IconColor,
} from './assets';

type IconProps = {
  name: IconType;
  width?: number;
  height?: number;
  color?: IconColor;
  hoverColor?: HoverColor;
  className?: string;
};

const Icon = ({
  name,
  width = 20,
  height = 20,
  color,
  hoverColor,
  className,
}: IconProps) => {
  const icon = iconMap[name] || iconMap.dashboard;
  const { type, file: IconComponent } = icon;

  const hoverColorClass = hoverColor && getColorClass(hoverColor);
  const colorHex = color ? COLORS[color] : undefined;

  const dynamicClassName = cn(
    'inline-block h-fit w-fit',
    hoverColorClass && type === 'fill' && `hover:fill-${hoverColorClass}`,
    hoverColorClass && type === 'stroke' && `hover:stroke-${hoverColorClass}`,
    className,
  );

  return (
    <IconComponent
      className={dynamicClassName}
      width={width}
      height={height}
      {...(type === 'stroke' ? { stroke: colorHex } : {})}
      {...(type === 'fill' ? { fill: colorHex } : {})}
    />
  );
};

Icon.displayName = 'Icon';

export default Icon;
