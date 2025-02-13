import MainPageBody from '@/components/shared/Main/Body';
import MainPageHeader from '@/components/shared/Main/Header';

const MainHome = () => {
  return (
    <div className='flex max-w-[1588px] flex-col gap-6'>
      <MainPageHeader />
      <MainPageBody />
    </div>
  );
};

export default MainHome;
