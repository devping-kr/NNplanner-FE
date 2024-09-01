import { cn } from '@/utils/core';
import { COLORS, IconColor, iconMap, IconType } from '@/components/icons';

type IconProps = {
  name: IconType;
  width?: number;
  height?: number;
  color?: IconColor;
  className?: string;
};

const Icon = ({
  name,
  width,
  height,
  color = 'black',
  className,
}: IconProps) => {
  const IconComponent = iconMap[name];

  return (
    <IconComponent
      className={cn('inline-block h-fit w-fit', className)}
      width={width}
      height={height}
      color={COLORS[color]}
    />
  );
};

Icon.displayName = 'Icon';

export default Icon;
