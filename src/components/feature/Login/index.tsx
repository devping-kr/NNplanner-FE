'use client';

import Logo from '@/components/common/Logo';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import LoginBody from '@/components/shared/Auth/LoginBody';
import { AUTH_TEXT } from '@/constants/_authText';

const Login = () => {
  const { title, serviceName, contents } = AUTH_TEXT.login;

  return (
    <main className='mx-auto my-0 flex overflow-hidden'>
      <section className='relative flex w-full flex-col gap-10 bg-green-100 pl-36 pt-48'>
        <AuthHeader
          title={title}
          serviceName={serviceName}
          contents={contents}
          href='/signup'
          image='login'
          linkText='join'
        />
      </section>
      <div className='h-full bg-gradient-to-b from-green-100 to-transparent'></div>
      <section className='flex h-screen w-1/2 flex-col items-center justify-center gap-10'>
        <Logo width={180} height={42} href='#' />
        <LoginBody />
      </section>
    </main>
  );
};

export default Login;
