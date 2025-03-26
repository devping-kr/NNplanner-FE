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
            src='/imgs/landing/stickers/sticker1.png'
            alt='스티커'
            width={100}
            height={74}
            className='absolute -right-56 bottom-[143px] h-[74px] w-[100px]'
          />
          <Image
            src='/imgs/landing/stickers/sticker2.png'
            alt='스티커'
            width={100}
            height={74}
            className='absolute -right-44 bottom-4 h-[74px] w-[100px]'
          />
        </>
      )}
      {id === 1 && (
        <Image
          src='/imgs/landing/stickers/sticker3.png'
          alt='스티커'
          width={96}
          height={64}
          className='absolute -left-20 top-24 h-16 w-24'
        />
      )}
      {id === 2 && (
        <>
          <Image
            src='/imgs/landing/stickers/sticker4.png'
            alt='스티커'
            width={100}
            height={74}
            className='absolute -left-56 top-32 h-[74px] w-[100px]'
          />
          <Image
            src='/imgs/landing/stickers/sticker5.png'
            alt='스티커'
            width={100}
            height={74}
            className='absolute -left-48 top-56 h-[74px] w-[100px]'
          />
          <Image
            src='/imgs/landing/stickers/sticker6.png'
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
