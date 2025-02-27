'use client';

import { H1Black } from '@/components/common/Typography';
import SignupBody from '@/components/shared/Auth/SignupBody';

const Signup = () => {
  return (
    <main className='mx-auto my-0 flex overflow-hidden'>
      <section className="h-screen w-full bg-[url('/imgs/auth.jpg')] bg-cover bg-center"></section>
      <section className='flex h-screen min-w-[608px] flex-col items-center justify-center gap-6 px-16'>
        <H1Black>회원가입</H1Black>
        <SignupBody />
      </section>
    </main>
  );
};

export default Signup;
