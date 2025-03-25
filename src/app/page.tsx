import FirstContent from '@/components/feature/Landing/FirstContent';
import FourthContent from '@/components/feature/Landing/FourthContent';
import LandingHeader from '@/components/feature/Landing/LandingHeader';
import SecondContent from '@/components/feature/Landing/SecondContent';
import ThirdContent from '@/components/feature/Landing/ThirdContent';

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <LandingHeader />
      <FirstContent />
      <SecondContent />
      <ThirdContent />
      <FourthContent />
    </div>
  );
}
