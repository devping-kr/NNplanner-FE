import Image from 'next/image';
import { cn } from '@/utils/core';

type BadgeProps = {
  imageSrc: string;
  size?: number;
  alt?: string;
  className?: string;
};

const Badge = ({
  imageSrc,
  size = 36,
  alt = 'Profile Image',
  className,
}: BadgeProps) => {
  return (
    <div
      className={cn(
        `h-fit w-fit min-w-9 overflow-hidden rounded-full`,
        className,
      )}
    >
      <Image src={imageSrc} width={size} height={size} alt={alt} />
    </div>
  );
};

export default Badge;
