'use client';

import { motion } from 'framer-motion';
import ContentHeader from '@/components/feature/Landing/_components/ContentHeader';
import ServiceCard from '@/components/feature/Landing/_components/ServiceCard';
import { LANDING_SERVICE } from '@/constants/_landingService';

const SecondContent = () => {
  return (
    <div className='mb-24 flex flex-col gap-10' id='section1'>
      <ContentHeader
        mainHeader='서비스 소개'
        subFirstHeader='영양사님,'
        subSecondColor='black'
        subSecondHeader='이런 고민 해보셨나요?'
      />
      <motion.div
        className='flex w-[1200px] justify-center gap-8'
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        viewport={{ amount: 'some', once: true }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {LANDING_SERVICE.map((service) => (
          <ServiceCard
            key={service.href}
            imgHref={service.href}
            firstContent={service.firstContent}
            secondContent={service.secondContent}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SecondContent;
