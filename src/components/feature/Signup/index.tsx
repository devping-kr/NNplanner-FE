import Logo from '@/components/common/Logo';
import AuthHeader from '@/components/shared/Auth/AuthHeader';
import SignupBody from '@/components/shared/Auth/SignupBody';
import { AUTH_TEXT } from '@/constants/_authText';

const Signup = () => {
  const { title, serviceName, contents } = AUTH_TEXT.signup;
  return (
    <main className='mx-auto my-0 flex overflow-hidden'>
      <section className='relative flex w-full flex-col gap-10 bg-green-100 pl-36 pt-48'>
        <AuthHeader
          title={title}
          serviceName={serviceName}
          contents={contents}
          href='/login'
          image='login'
          linkText='login'
        />
      </section>
      <div className='h-full bg-gradient-to-b from-green-100 to-transparent'></div>
      <section className='flex h-screen w-1/2 flex-col items-center justify-center gap-10'>
        <Logo width={180} height={42} href='#' />
        <SignupBody />
      </section>
    </main>
  );
};

export default Signup;
