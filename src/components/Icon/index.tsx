import { cloneElement, ReactElement, SVGProps } from 'react';
import { cn } from '@/utils/core';
import { iconVariants } from '@/components/Icon/Icon.variant';

type IconProps = {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  padding?: 'small' | 'basic' | 'large';
  className?: string;
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
};

const Icon = ({
  icon,
  padding = 'basic',
  className,
  width,
  height,
  stroke,
  fill,
}: IconProps) => {
  const {
    width: iconWidth,
    height: iconHeight,
    stroke: iconStroke,
    fill: iconFill,
    ...iconProps
  } = icon.props;

  return (
    <span className={cn(iconVariants({ padding }), className)}>
      {cloneElement(icon, {
        width: width ?? iconWidth,
        height: height ?? iconHeight,
        stroke: stroke ?? iconStroke,
        fill: fill ?? iconFill,
        ...iconProps,
      })}
    </span>
  );
};

export default Icon;
