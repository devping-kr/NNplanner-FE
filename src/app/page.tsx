import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col gap-20'>
      <Link href={'/seunghyun'}>승현 작업</Link>
      <Link href={'/woorim'}>우림 작업</Link>
    </div>
  );
}
