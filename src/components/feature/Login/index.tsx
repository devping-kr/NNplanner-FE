'use client';

import Logo from '@/components/common/Logo';
import LoginBody from '@/components/shared/Auth/LoginBody';

const Login = () => {
  return (
    <main className='mx-auto my-0 flex overflow-hidden'>
      <section className="flex h-screen w-full flex-col gap-10 bg-[url('/imgs/auth.jpg')] bg-cover bg-center"></section>
      <div className='h-full bg-gradient-to-b from-green-100 to-transparent'></div>
      <section className='flex h-screen w-1/2 flex-col items-center justify-center gap-10 px-8'>
        <Logo width={180} height={42} href='#' />
        <LoginBody />
      </section>
    </main>
  );
};

export default Login;
