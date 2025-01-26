import Image from 'next/image';
import { cn } from '@/utils/core';

const DEFAULT_PROFILE_IMAGE = '/imgs/pi-gon-ping.jpg';

type Props = {
  src: string;
  size: number;
  alt?: string;
  className?: string;
};

const ProfileImage = ({
  src,
  size,
  alt = 'Profile Image',
  className,
}: Props) => {
  return (
    <div
      className={cn(
        'h-fit w-fit min-w-9 overflow-hidden rounded-full border border-grey-100',
        className,
      )}
    >
      <Image
        src={src || DEFAULT_PROFILE_IMAGE}
        width={size}
        height={size}
        alt={alt}
      />
    </div>
  );
};

export default ProfileImage;
