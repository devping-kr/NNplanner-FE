'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/core';
import {
  H1Green500,
  H1Grey900,
  Subtitle2Grey900,
} from '@/components/common/Typography';

interface Props {
  mainHeader: string;
  subFirstHeader: string;
  subSecondHeader?: string;
  subSecondColor?: string;
  isCenter?: boolean;
}

const ContentHeader = ({
  mainHeader,
  subFirstHeader,
  subSecondHeader,
  subSecondColor = 'black',
  isCenter = true,
}: Props) => {
  return (
    <motion.div
      className={cn(
        'mt-20 flex w-full flex-col gap-4',
        !isCenter ? 'items-start' : 'items-center',
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <Subtitle2Grey900>{mainHeader}</Subtitle2Grey900>
      <div className='flex flex-col items-center'>
        <H1Grey900>{subFirstHeader}</H1Grey900>
        {subSecondColor === 'black' && subSecondHeader && (
          <H1Grey900>{subSecondHeader}</H1Grey900>
        )}
        {subSecondColor === 'green' && subSecondHeader && (
          <H1Green500>{subSecondHeader}</H1Green500>
        )}
      </div>
    </motion.div>
  );
};

export default ContentHeader;
