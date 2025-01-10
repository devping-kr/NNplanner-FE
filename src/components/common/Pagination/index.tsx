'use client';

import { useState } from 'react';
import { cn } from '@/utils/core';
import Button from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';

interface Props {
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPosts: number;
}

const ZERO = 0;
const ONE = 1;

const Pagination = ({ limit, page, setPage, totalPosts }: Props) => {
  const [blockNum, setBlockNum] = useState(0);

  const totalPages = Math.ceil(totalPosts / limit);
  const blockArea = blockNum * limit;

  const createArr = Array(totalPages)
    .fill(ZERO)
    .map((_, i) => (
      <Button
        key={i + ONE}
        onClick={() => setPage(i + ONE)}
        aria-current={page === i + ONE ? 'page' : undefined}
        variant={'pagination'}
        className={cn(
          '',
          page === i + ONE && 'bg-green-500 text-white-100 hover:bg-green-500',
          totalPages === ONE &&
            'cursor-default border-none bg-transparent text-green-500 hover:bg-transparent active:bg-transparent',
        )}
      >
        {i + ONE}
      </Button>
    ));

  const sliceArr = createArr.slice(blockArea, limit + blockArea);

  const firstPage = () => {
    setPage(ONE);
    setBlockNum(ZERO);
  };

  const lastPage = () => {
    setPage(totalPages);
    setBlockNum(Math.ceil(totalPages / limit) - ONE);
  };

  const prevBtnHandler = () => {
    if (page > ONE) {
      if (page - ONE <= limit * blockNum) {
        setBlockNum((num) => Math.max(num - ONE, 0));
      }
      setPage((num) => num - ONE);
    }
  };

  const nextBtnHandler = () => {
    if (page < totalPages) {
      if (page + ONE > limit * (blockNum + ONE)) {
        setBlockNum((num) => num + ONE);
      }
      setPage((num) => num + ONE);
    }
  };

  return (
    <div className='flex w-full items-center justify-center gap-2'>
      <Button
        onClick={firstPage}
        disabled={blockNum === ZERO}
        variant='pagination'
      >
        <Icon
          name='arrowPrevBlock'
          width={24}
          height={24}
          color={blockNum === ZERO ? 'grey' : 'black'}
        />
      </Button>
      <Button
        onClick={prevBtnHandler}
        disabled={page === ONE}
        variant='pagination'
      >
        <Icon
          name='arrowPrev'
          width={24}
          height={24}
          color={page === ONE ? 'grey' : 'black'}
        />
      </Button>
      {sliceArr}
      <Button
        onClick={nextBtnHandler}
        disabled={page === totalPages}
        variant='pagination'
      >
        <Icon
          name='arrowNext'
          width={24}
          height={24}
          color={page === totalPages ? 'grey' : 'black'}
        />
      </Button>
      <Button
        onClick={lastPage}
        disabled={blockArea >= totalPages - limit}
        variant='pagination'
      >
        <Icon
          name='arrowNextBlock'
          width={24}
          height={24}
          color={blockArea >= totalPages - limit ? 'grey' : 'black'}
        />
      </Button>
    </div>
  );
};

export default Pagination;
