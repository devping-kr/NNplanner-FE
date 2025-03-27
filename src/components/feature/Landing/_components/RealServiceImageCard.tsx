import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/utils/core';
import { H5Grey800 } from '@/components/common/Typography';

interface Props {
  href: string;
  content: string;
  id: number;
}

const RealServiceImageCard = ({ href, content, id }: Props) => {
  return (
    <motion.div
      initial={{ y: 200 }}
      whileInView={{ y: 0 }}
      viewport={{ amount: 'some', once: true }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={cn(
        'relative flex flex-col gap-8 self-start rounded-2xl bg-grey-50 p-10',
        id === 1 && 'self-center',
        id === 2 && 'self-end',
      )}
    >
      {id === 0 && (
        <>
          <Image
            src='/imgs/landing/stickers/graphic01.png'
            alt='스티커'
            width={183}
            height={202}
            className='absolute -right-56 bottom-4'
          />
        </>
      )}
      {id === 1 && (
        <Image
          src='/imgs/landing/stickers/graphic02.png'
          alt='스티커'
          width={100}
          height={74}
          className='absolute -left-[70px] top-32 h-[74px] w-[100px]'
        />
      )}
      {id === 2 && (
        <>
          <Image
            src='/imgs/landing/stickers/graphic03.png'
            alt='스티커'
            width={132}
            height={172}
            className='absolute -left-56 top-32 h-[172px] w-[132px]'
          />
          <Image
            src='/imgs/landing/stickers/graphic04.png'
            alt='스티커'
            width={100}
            height={74}
            className='absolute -bottom-10 right-28 h-[74px] w-[100px]'
          />
        </>
      )}
      <Image
        src={href}
        alt='실제 서비스 사진'
        width={884}
        height={424}
        className='h-[424px] w-[884px] rounded-2xl'
      />
      <H5Grey800>{content}</H5Grey800>
    </motion.div>
  );
};

export default RealServiceImageCard;
