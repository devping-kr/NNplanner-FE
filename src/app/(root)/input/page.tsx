'use client';

import { Input } from '@/components/common/Input';

const page = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-1'>
        <span>white Input</span>
        <div className='flex w-full flex-col items-center gap-2 bg-grey-400 px-3 py-3'>
          <Input variant='white' size='s' />
          <Input variant='white' size='m' />
          <Input variant='white' size='s' placeholder='Placeholder...' />
          <Input variant='white' size='m' placeholder='Placeholder...' />
          <Input
            variant='white'
            size='s'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='show'
            placeholder='Placeholder...'
          />
          <Input
            variant='white'
            size='m'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='show'
            placeholder='Placeholder...'
          />
          <Input
            variant='white'
            size='s'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='hide'
            placeholder='Placeholder...'
          />
          <Input
            variant='white'
            size='m'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='hide'
            placeholder='Placeholder...'
          />
          <Input
            variant='white'
            size='m'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='hide'
            placeholder='Placeholder...'
            disabled={true}
          />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <span>Grey Input</span>
        <div className='flex w-full flex-col items-center gap-2 bg-grey-400 px-3 py-3'>
          <Input variant='grey50' size='s' />
          <Input variant='grey50' size='m' />
          <Input variant='grey50' size='s' placeholder='Placeholder...' />
          <Input variant='grey50' size='m' placeholder='Placeholder...' />
          <Input
            variant='grey50'
            size='s'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='show'
            placeholder='Placeholder...'
          />
          <Input
            variant='grey50'
            size='m'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='show'
            placeholder='Placeholder...'
          />
          <Input
            variant='grey50'
            size='s'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='hide'
            placeholder='Placeholder...'
          />
          <Input
            variant='grey50'
            size='m'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='hide'
            placeholder='Placeholder...'
          />
          <Input
            variant='grey50'
            size='m'
            rightIconAction={() => alert('아이콘 클릭!')}
            isRightIcon
            rightIcon='hide'
            placeholder='Placeholder...'
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
