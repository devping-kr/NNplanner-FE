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
  size = 40,
  alt = 'Profile Image',
  className,
}: BadgeProps) => {
  return (
    <div className={cn(`h-fit w-fit overflow-hidden rounded-full`, className)}>
      <Image
        src={imageSrc}
        width={size}
        height={size}
        alt={alt}
        objectFit='cover'
      />
    </div>
  );
};

export default Badge;
