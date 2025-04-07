import Button from '@/components/common/Button/Button';

const page = () => {
  return (
    <div className='flex h-full flex-col gap-4 bg-[#d8d8d8]'>
      <h2>PRIMARY</h2>
      <div className='flex gap-2'>
        <Button variant='primary' size='xs' width='fit'>
          BUTTON 1
        </Button>
        <Button variant='primary' size='sm' width='fit'>
          BUTTON 1
        </Button>
        <Button variant='primary' size='md' width='fit'>
          BUTTON 1
        </Button>
        <Button variant='primary' size='lg' width='fit'>
          BUTTON 1
        </Button>
        <Button variant='primary' width='circular'>
          O
        </Button>
        <Button variant='primary' size='xs' disabled>
          BUTTON 1
        </Button>
        <Button variant='primary' size='sm' disabled>
          BUTTON 1
        </Button>
        <Button variant='primary' size='md' disabled>
          BUTTON 1
        </Button>
        <Button variant='primary' size='lg' disabled>
          BUTTON 1
        </Button>
      </div>
      <h2>GREY</h2>
      <div className='flex gap-2'>
        <Button variant='grey' size='xs'>
          BUTTON 2
        </Button>
        <Button variant='grey' size='sm'>
          BUTTON 2
        </Button>
        <Button variant='grey' size='md'>
          BUTTON 2
        </Button>
        <Button variant='grey' size='lg'>
          BUTTON 2
        </Button>
        <Button variant='grey' width='circular'>
          O
        </Button>
        <Button variant='grey' size='xs' disabled>
          BUTTON 2
        </Button>
        <Button variant='grey' size='sm' disabled>
          BUTTON 2
        </Button>
        <Button variant='grey' size='md' disabled>
          BUTTON 2
        </Button>
        <Button variant='grey' size='lg' disabled>
          BUTTON 2
        </Button>
      </div>
      <h2>SECONDARY</h2>
      <div className='flex gap-2'>
        <Button variant='secondary' size='xs'>
          BUTTON 3
        </Button>
        <Button variant='secondary' size='sm'>
          BUTTON 3
        </Button>
        <Button variant='secondary' size='md'>
          BUTTON 3
        </Button>
        <Button variant='secondary' size='lg'>
          BUTTON 3
        </Button>
        <Button variant='secondary' width='circular'>
          O
        </Button>
        <Button variant='secondary' size='xs' disabled>
          BUTTON 3
        </Button>
        <Button variant='secondary' size='sm' disabled>
          BUTTON 3
        </Button>
        <Button variant='secondary' size='md' disabled>
          BUTTON 3
        </Button>
        <Button variant='secondary' size='lg' disabled>
          BUTTON 3
        </Button>
      </div>
      <h2>TERITARY</h2>
      <div className='flex gap-2'>
        <Button variant='teritary' size='xs'>
          BUTTON
        </Button>
        <Button variant='teritary' size='sm'>
          BUTTON
        </Button>
        <Button variant='teritary' size='md'>
          BUTTON
        </Button>
        <Button variant='teritary' size='lg'>
          BUTTON
        </Button>
        <Button variant='teritary' width='circular'>
          O
        </Button>
        <Button variant='teritary' size='xs' disabled>
          BUTTON
        </Button>
        <Button variant='teritary' size='sm' disabled>
          BUTTON
        </Button>
        <Button variant='teritary' size='md' disabled>
          BUTTON
        </Button>
        <Button variant='teritary' size='lg' disabled>
          BUTTON
        </Button>
      </div>
      <h2>OUTLINE</h2>
      <div className='flex gap-2'>
        <Button variant='outline' size='xs'>
          BUTTON
        </Button>
        <Button variant='outline' size='sm'>
          BUTTON
        </Button>
        <Button variant='outline' size='md'>
          BUTTON
        </Button>
        <Button variant='outline' size='lg'>
          BUTTON
        </Button>
        <Button variant='outline' width='circular'>
          O
        </Button>
        <Button variant='outline' size='xs' disabled>
          BUTTON
        </Button>
        <Button variant='outline' size='sm' disabled>
          BUTTON
        </Button>
        <Button variant='outline' size='md' disabled>
          BUTTON
        </Button>
        <Button variant='outline' size='lg' disabled>
          BUTTON
        </Button>
      </div>
    </div>
  );
};

export default page;
