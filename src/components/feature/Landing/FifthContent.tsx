'use client';

import { motion } from 'framer-motion';
import ContentHeader from '@/components/feature/Landing/_components/ContentHeader';
import QnACard from '@/components/feature/Landing/_components/QnACard';
import { QNA_DATA } from '@/constants/_landingService';

const FifthContent = () => {
  return (
    <section className='mb-24 flex flex-col gap-10' id='section3'>
      <ContentHeader
        mainHeader='자주 묻는 질문'
        subFirstHeader='FAQ'
        subSecondColor='black'
      />
      <motion.div
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        viewport={{ amount: 'some', once: true }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className='flex w-[1200px] flex-col gap-8'
      >
        {QNA_DATA.map((qna) => (
          <QnACard
            key={qna.id}
            id={qna.id}
            question={qna.question}
            answer={qna.answer}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default FifthContent;
