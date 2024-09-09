import Image from 'next/image';
import Link from 'next/link';

interface Props {
  width: number;
  height: number;
  href: string;
}

const Logo = ({ width, height, href }: Props) => {
  return (
    <Link href={href}>
      <Image
        src={'/imgs/navbar-logo.png'}
        alt='로고이미지'
        width={width}
        height={height}
      />
    </Link>
  );
};

export default Logo;
