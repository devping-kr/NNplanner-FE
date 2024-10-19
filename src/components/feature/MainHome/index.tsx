import MainPageBody from '@/components/shared/Main/Body';
import MainPageHeader from '@/components/shared/Main/Header';

const MainHome = () => {
  return (
    <div className='flex flex-col gap-6'>
      <MainPageHeader />
      <MainPageBody />
    </div>
  );
};

export default MainHome;
