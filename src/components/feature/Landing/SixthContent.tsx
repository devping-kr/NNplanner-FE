'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactCard from '@/components/feature/Landing/_components/ContactCard';
import ContentHeader from '@/components/feature/Landing/_components/ContentHeader';

const SixthContent = () => {
  return (
    <motion.section
      initial={{ borderRadius: 0, marginLeft: 0, marginRight: 0 }}
      animate={{ borderRadius: 56, marginLeft: 32, marginRight: 32 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className='relative flex flex-col items-center gap-8 bg-green-50 px-[360px] pb-24'
    >
      <Image
        src='/imgs/landing/stickers/graphic.png'
        alt='스티커 모음'
        className='absolute right-8 top-0'
        width={552}
        height={235}
        style={{ width: 552, height: 235 }}
      />
      <ContentHeader
        mainHeader='문의하기'
        subFirstHeader='의견을 남겨주세요.'
        isCenter={false}
      />
      <motion.div
        className='flex justify-center gap-12'
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        viewport={{ amount: 'some', once: true }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <ContactCard />
      </motion.div>
    </motion.section>
  );
};

export default SixthContent;
