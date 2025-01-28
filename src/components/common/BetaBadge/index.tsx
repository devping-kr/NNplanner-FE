import Image from 'next/image';
import { IMAGE_PATH } from '@/constants/_imgPath';

const { active, inactive, WIDTH, HEIGHT } = IMAGE_PATH.beta;

const BetaBadge = ({ isActive }: { isActive: boolean }) => (
  <Image
    src={isActive ? active.src : inactive.src}
    width={WIDTH}
    height={HEIGHT}
    alt={isActive ? active.alt : inactive.alt}
  />
);

export default BetaBadge;
