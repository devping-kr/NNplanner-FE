'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import {
  Body2White,
  H3White,
  LandingWhite,
} from '@/components/common/Typography';
import useNavigate from '@/hooks/useNavigate';

const iconAnimation = (delay: number) => ({
  y: [0, -10, 0],
  transition: {
    duration: 0.6,
    ease: 'easeInOut',
    delay,
    repeat: Infinity,
    repeatDelay: 1.2,
  },
});

const FirstContent = () => {
  const { navigate } = useNavigate();

  return (
    <motion.section
      initial={{ borderRadius: 0, marginLeft: 0, marginRight: 0 }}
      animate={{ borderRadius: 56, marginLeft: 32, marginRight: 32 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className='bg-green-500'
      id='section0'
    >
      <div className='flex flex-col gap-8 px-[328px] py-12'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <LandingWhite>학교&#8226;병원 영양사들을 위한</LandingWhite>
            <div className='flex gap-6'>
              <motion.div animate={iconAnimation(0)}>
                <Icon name='squares' width={80} height={80} color='white' />
              </motion.div>
              <motion.div animate={iconAnimation(0.6)}>
                <Icon name='tablecells' width={80} height={80} color='white' />
              </motion.div>
              <motion.div animate={iconAnimation(1.2)}>
                <Icon name='chartPie' width={80} height={80} color='white' />
              </motion.div>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <LandingWhite>ALL IN ONE</LandingWhite>
            <LandingWhite>식단 관리 서비스</LandingWhite>
            <LandingWhite>냠냠플래너</LandingWhite>
          </div>
        </div>
        <Image
          src='/imgs/mainGraphic.png'
          alt='첫번째 랜딩페이지 사진'
          width={1200}
          height={600}
          style={{ width: 1200, height: 600 }}
          className='rounded-2xl'
        />
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <Body2White>냠냠플래너로</Body2White>
            <Body2White>스마트한 식단 관리를 시작하세요!</Body2White>
          </div>
          <Button
            className='flex gap-4 rounded-full px-8'
            variant='landingPrimary'
            size='xl'
            onClick={() => navigate('/login')}
          >
            <H3White>지금 무료로 시작하기</H3White>
            <Icon name='arrowRight' width={32} height={32} color='white' />
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default FirstContent;
