'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/core';
import {
  Body2Grey800,
  H5Green500,
  H5Grey800,
} from '@/components/common/Typography';

interface Props {
  id: number;
  question: string;
  answer: string;
}

const QnACard = ({ id, question, answer }: Props) => {
  return (
    <motion.div
      className={cn(
        'flex flex-col gap-4 rounded-2xl p-8',
        id % 2 === 0 && 'border border-grey-100 bg-white-100',
        id % 2 === 1 && 'bg-grey-50',
      )}
    >
      <div className='flex gap-2'>
        <H5Green500>Q.</H5Green500>
        <H5Grey800>{question}</H5Grey800>
      </div>
      <Body2Grey800>{answer}</Body2Grey800>
    </motion.div>
  );
};

export default QnACard;
