import { Input } from '@/components/common/Input';

const page = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex w-full items-center gap-2 bg-grey-400 px-3 py-3'>
        <Input variant='white' size='s' />
        <Input variant='grey50' size='m' />
      </div>
      <div className='flex w-full items-center gap-2 bg-grey-400 px-3 py-3'>
        <Input
          variant='white'
          placeholder='Placeholder...'
          isRightIcon
          rightIcon='show'
          size='s'
        />
        <Input
          variant='grey50'
          placeholder='Placeholder...'
          isRightIcon
          rightIcon='show'
          size='m'
        />
      </div>
      <div className='flex w-full items-center gap-2 bg-grey-400 px-3 py-3'>
        <Input
          variant='white'
          placeholder='Placeholder...'
          isRightIcon
          rightIcon='hide'
          size='s'
        />
        <Input
          variant='grey50'
          placeholder='Placeholder...'
          isRightIcon
          rightIcon='hide'
          size='m'
        />
      </div>
      <div className='flex w-full items-center gap-2 bg-grey-400 px-3 py-3'>
        <Input
          variant='white'
          placeholder='Placeholder...'
          disabled={true}
          size='s'
        />
        <Input
          variant='grey50'
          placeholder='Placeholder...'
          disabled={true}
          size='m'
        />
      </div>
    </div>
  );
};

export default page;
