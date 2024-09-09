import Image from 'next/image';
import Link from 'next/link';
import {
  AuthTitle,
  BodyGray,
  BodyPrimary,
} from '@/components/common/Typography';

interface AuthHeaderProps {
  title: string;
  serviceName: string;
  contents: string;
  href: string;
  image: string;
  linkText: string;
}

const AuthHeader = ({
  title,
  serviceName,
  contents,
  href,
  image,
  linkText,
}: AuthHeaderProps) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <AuthTitle>{title}</AuthTitle>
        <BodyPrimary>{serviceName}</BodyPrimary>
      </div>
      <div className='flex flex-col gap-2'>
        <BodyGray>{contents}</BodyGray>
        <div className='flex items-center gap-4'>
          <BodyGray>you can</BodyGray>
          <Link href={href} className='w-fit font-bold text-green-600'>
            {`${linkText} here!`}
          </Link>
        </div>
        <Image
          className='absolute bottom-0 right-5'
          src={`/imgs/${image}.png`}
          alt={`${image} 이미지`}
          width={340}
          height={450}
        />
      </div>
    </>
  );
};

export default AuthHeader;
