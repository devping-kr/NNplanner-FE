import Image from 'next/image';
import { Body3Grey400 } from '@/components/common/Typography';

const LandingFooter = () => {
  return (
    <div className='flex w-full items-center justify-between p-8 pb-32'>
      <Image
        src='/imgs/landing/greyLogo.png'
        alt='회색 로고'
        width={66}
        height={48}
        style={{ width: 66, height: 48 }}
      />
      <Body3Grey400>© 2025 냠냠플래너. All Rights Reserved.</Body3Grey400>
      <Body3Grey400>plannernn@gmail.com</Body3Grey400>
    </div>
  );
};

export default LandingFooter;
