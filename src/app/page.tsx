import FirstContent from '@/components/feature/Landing/FirstContent';
import LandingHeader from '@/components/feature/Landing/LandingHeader';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <LandingHeader />
      <FirstContent />
    </div>
  );
}
