import React from 'react';
import Badge from '@/components/common/Badge';

const page = () => {
  return (
    <div className='flex h-full flex-col gap-4 bg-white-100 p-5'>
      <div className='flex gap-2'>
        <Badge text='text' textType='body' variant='default' size='s' />
        <Badge text='text' textType='body' variant='outline' size='s' />
        <Badge text='text' textType='body' variant='red' size='s' />
        <Badge text='text' textType='body' variant='blue' size='s' />
        <Badge text='text' textType='subtitle' variant='default' size='s' />
        <Badge text='text' textType='subtitle' variant='outline' size='s' />
        <Badge text='text' textType='subtitle' variant='red' size='s' />
        <Badge text='text' textType='subtitle' variant='blue' size='s' />
      </div>
      <div className='flex gap-2'>
        <Badge text='text' textType='body' variant='default' size='m' />
        <Badge text='text' textType='body' variant='outline' size='m' />
        <Badge text='text' textType='body' variant='red' size='m' />
        <Badge text='text' textType='body' variant='blue' size='m' />
        <Badge text='text' textType='subtitle' variant='default' size='m' />
        <Badge text='text' textType='subtitle' variant='outline' size='m' />
        <Badge text='text' textType='subtitle' variant='red' size='m' />
        <Badge text='text' textType='subtitle' variant='blue' size='m' />
      </div>
    </div>
  );
};

export default page;
