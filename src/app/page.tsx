import FirstContent from '@/components/feature/Landing/FirstContent';
import LandingHeader from '@/components/feature/Landing/LandingHeader';
import SecondContent from '@/components/feature/Landing/SecondContent';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <LandingHeader />
      <FirstContent />
      <SecondContent />
    </div>
  );
}
