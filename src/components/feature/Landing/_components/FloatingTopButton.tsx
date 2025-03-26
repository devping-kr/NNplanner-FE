'use client';

import { Link } from 'react-scroll';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';

const FloatingTopButton = () => {
  return (
    <Link
      to='section0'
      smooth
      duration={800}
      spy
      offset={-100}
      className='fixed bottom-10 right-24 z-50 transition-none'
    >
      <Button variant='teritary' width='circular'>
        <Icon name='arrowUp' width={24} height={24} color='white' />
      </Button>
    </Link>
  );
};

export default FloatingTopButton;
