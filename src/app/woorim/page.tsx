'use client';

import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import { Search } from '@/components/icons';
import Edit from '@/components/icons/Edit';

const page = () => {
  return (
    <div className='flex flex-col gap-4 p-4 bg-slate-600 w-full h-full'>
      <div className='flex gap-4 items-end'>
        <Icon width={14} height={14} stroke='red' icon={<Search />} />
        <Icon padding='basic' fill='blue' icon={<Edit />} />
        <Icon padding='large' width={24} height={24} icon={<Search />} />
      </div>

      <div className='flex gap-4 items-end'>
        <Button variant='primary' size='small' width='fit'>
          SMALL PRIMARY
        </Button>
        <Button variant='primary' size='basic' width='fit'>
          BASIC PRIMARY
        </Button>
        <Button variant='primary' size='large' width='fit'>
          LARGE PRIMARY
        </Button>
      </div>
      <div className='flex gap-4 items-end'>
        <Button variant='secondary' size='small' width='fit'>
          SMALL SECONDARY
        </Button>
        <Button variant='secondary' size='basic' width='fit'>
          BASIC SECONDARY
        </Button>
        <Button variant='secondary' size='large' width='fit'>
          LARGE SECONDARY
        </Button>
      </div>
      <div className='flex gap-4 items-end'>
        <Button variant='outline' size='small' width='fit'>
          SMALL OUTLINE
        </Button>
        <Button variant='outline' size='basic' width='fit'>
          BASIC OUTLINE
        </Button>
        <Button variant='outline' size='large' width='fit'>
          LARGE OUTLINE
        </Button>
      </div>
    </div>
  );
};

export default page;
