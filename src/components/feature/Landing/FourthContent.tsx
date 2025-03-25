'use client';

import { motion } from 'framer-motion';
import ContentHeader from '@/components/feature/Landing/_components/ContentHeader';
import FunctionCard from '@/components/feature/Landing/_components/FunctionCard';
import { FUNCTION_DATA } from '@/constants/_landingService';

const FourthContent = () => {
  return (
    <motion.section
      initial={{ borderRadius: 0, marginLeft: 0, marginRight: 0 }}
      animate={{ borderRadius: 56, marginLeft: 32, marginRight: 32 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className='flex flex-col items-center gap-8 bg-grey-50 px-[360px] py-20'
    >
      <ContentHeader
        mainHeader='기능 소개'
        subFirstHeader='식단 작성부터 관리까지'
        subSecondColor='green'
        subSecondHeader='냠냠플래너 하나면 OK'
      />
      <motion.div
        className='flex justify-center gap-12'
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        viewport={{ amount: 'some', once: true }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {FUNCTION_DATA.map((func) => (
          <FunctionCard
            key={func.id}
            imgHref={func.href}
            firstContent={func.firstContent}
            secondContent={func.secondContent}
            title={func.title}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FourthContent;
