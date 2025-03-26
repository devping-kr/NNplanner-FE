import FloatingTopButton from '@/components/feature/Landing/_components/FloatingTopButton';
import FifthContent from '@/components/feature/Landing/FifthContent';
import FirstContent from '@/components/feature/Landing/FirstContent';
import FourthContent from '@/components/feature/Landing/FourthContent';
import LandingFooter from '@/components/feature/Landing/LandingFooter';
import LandingHeader from '@/components/feature/Landing/LandingHeader';
import SecondContent from '@/components/feature/Landing/SecondContent';
import SixthContent from '@/components/feature/Landing/SixthContent';
import ThirdContent from '@/components/feature/Landing/ThirdContent';

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <FloatingTopButton />
      <LandingHeader />
      <FirstContent />
      <SecondContent />
      <ThirdContent />
      <FourthContent />
      <FifthContent />
      <SixthContent />
      <LandingFooter />
    </div>
  );
}
