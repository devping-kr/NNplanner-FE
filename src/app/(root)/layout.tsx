import Navbar from '@/components/common/Navbar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen'>
      <Navbar />
      <main className='ml-60 flex-grow bg-white-200 p-6 pt-12'>{children}</main>
    </div>
  );
};

export default RootLayout;
