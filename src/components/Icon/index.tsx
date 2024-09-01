import { COLORS, IconColor, iconMap, IconType } from '@/components/icons';

type IconProps = {
  name: IconType;
  width?: number;
  height?: number;
  color?: IconColor;
};

const Icon = ({ name, width, height, color = 'black' }: IconProps) => {
  const IconComponent = iconMap[name];

  return (
    <span className='inline-block w-fit h-fit'>
      <IconComponent width={width} height={height} color={COLORS[color]} />
    </span>
  );
};

Icon.displayName = 'Icon';

export default Icon;
