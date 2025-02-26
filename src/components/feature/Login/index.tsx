'use client';

import { H1Black } from '@/components/common/Typography';
import LoginBody from '@/components/shared/Auth/LoginBody';

const Login = () => {
  return (
    <main className='mx-auto my-0 flex overflow-hidden'>
      <section className="h-screen w-full bg-[url('/imgs/auth.jpg')] bg-cover bg-center"></section>
      <section className='flex h-screen min-w-[608px] flex-col items-center justify-center gap-6 px-16'>
        <H1Black>로그인</H1Black>
        <LoginBody />
      </section>
    </main>
  );
};

export default Login;
