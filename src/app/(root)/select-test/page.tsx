import React from 'react';
import { Selectbox } from '@/components/common/Selectbox';
import { Body1Black } from '@/components/common/Typography';

const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
  { value: 'option5', label: '옵션 5' },
  { value: 'option6', label: '옵션 6' },
  { value: 'option7', label: '옵션 7' },
  { value: 'option8', label: '옵션 8' },
  { value: 'option9', label: '옵션 9' },
  { value: 'option10', label: '옵션 10' },
];

const page = () => {
  return (
    <div className='mt-20 bg-[#D8D8D8] p-4'>
      <Body1Black>Select Box</Body1Black>
      <div className='flex flex-col gap-2'>
        <Selectbox options={options} buttonSize='sm' />
        <Selectbox options={options} buttonSize='sm' bgColor='grey' />
        <Selectbox options={options} buttonSize='md' />
        <Selectbox options={options} buttonSize='md' bgColor='grey' />
        <Selectbox
          options={options}
          buttonSize='sm'
          bgColor='disabled'
          readonly
        />
        <Selectbox
          options={options}
          buttonSize='md'
          bgColor='disabled'
          readonly
        />
      </div>
    </div>
  );
};

export default page;
