'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/common/Icon';
import { H1Green500, H1Grey900 } from '@/components/common/Typography';
import RealServiceImageCard from '@/components/feature/Landing/_components/RealServiceImageCard';
import { REAL_SERVICE } from '@/constants/_landingService';

const ThirdContent = () => {
  return (
    <div className='flex w-[1200px] flex-col gap-10 pb-32'>
      <motion.div
        className='flex flex-col gap-4'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <Icon name='arrowRight' width={48} height={48} color='grey' />
        <div className='flex flex-col'>
          <div className='flex'>
            <H1Green500>냠냠플래너</H1Green500>
            <H1Grey900>가</H1Grey900>
          </div>
          <H1Grey900>해결해 드릴게요!</H1Grey900>
        </div>
      </motion.div>
      {REAL_SERVICE.map((real) => (
        <RealServiceImageCard
          content={real.content}
          href={real.href}
          id={real.id}
          key={real.id}
        />
      ))}
    </div>
  );
};

export default ThirdContent;
