'use client';

import {
  OutlineButton,
  PrimaryButton,
  SecondaryButton,
} from '@/components/Button/Button';

const page = () => {
  return (
    <div className='flex flex-col gap-4 p-4 bg-slate-600 w-full h-full'>
      <div className='flex gap-4 items-end'>
        <PrimaryButton size='small' width='fit'>
          SMALL PRIMARY
        </PrimaryButton>
        <PrimaryButton size='basic' width='fit'>
          BASIC PRIMARY
        </PrimaryButton>
        <PrimaryButton size='large' width='fit'>
          LARGE PRIMARY
        </PrimaryButton>
      </div>
      <div className='flex gap-4 items-end'>
        <SecondaryButton size='small' width='fit'>
          SMALL SECONDARY
        </SecondaryButton>
        <SecondaryButton size='basic' width='fit'>
          BASIC SECONDARY
        </SecondaryButton>
        <SecondaryButton size='large' width='fit'>
          LARGE SECONDARY
        </SecondaryButton>
      </div>
      <div className='flex gap-4 items-end'>
        <OutlineButton size='small' width='fit'>
          SMALL OUTLINE
        </OutlineButton>
        <OutlineButton size='basic' width='fit'>
          BASIC OUTLINE
        </OutlineButton>
        <OutlineButton size='large' width='fit'>
          LARGE OUTLINE
        </OutlineButton>
      </div>
    </div>
  );
};

export default page;
