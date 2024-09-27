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

const PAGE_LIMIT = 5;
const ZERO = 0;
const ONE = 1;

const Pagination = ({ limit, page, setPage, totalPosts }: Props) => {
  const [blockNum, setBlockNum] = useState(0);
  const blockArea = Number(blockNum * PAGE_LIMIT);
  const totalPages = Math.ceil(totalPosts / limit);
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
          page === i + ONE ? 'bg-green-400 hover:bg-green-400' : '',
        )}
      >
        {i + ONE}
      </Button>
    ));

  const sliceArr = createArr.slice(blockArea, Number(PAGE_LIMIT) + blockArea);

  const firstPage = () => {
    setPage(ONE);
    setBlockNum(ZERO);
  };

  const lastPage = () => {
    setPage(totalPages);
    setBlockNum(Math.ceil(totalPages / PAGE_LIMIT) - ONE);
  };

  const prevBtnHandler = () => {
    if (page <= ONE) {
      return;
    }
    if (page - ONE <= PAGE_LIMIT * blockNum) {
      setBlockNum((num) => num - ONE);
    }
    setPage((num) => num - ONE);
  };

  const nextBtnHandler = () => {
    if (page >= totalPages) {
      return;
    }
    if (PAGE_LIMIT * Number(blockNum + ONE) < Number(page + ONE)) {
      setBlockNum((num) => num + ONE);
    }
    setPage((num) => num + ONE);
  };

  return (
    <div className='flex w-full items-center justify-center gap-2'>
      <Button
        onClick={firstPage}
        disabled={blockNum === ZERO}
        variant={'pagination'}
      >
        <Icon name='arrowPrevBlock' width={15} height={15} color='white' />
      </Button>
      <Button
        onClick={prevBtnHandler}
        disabled={page === ONE}
        variant={'pagination'}
      >
        <Icon name='arrowPrev' width={15} height={15} color='white' />
      </Button>
      {sliceArr}
      <Button
        onClick={nextBtnHandler}
        disabled={page === totalPages}
        variant={'pagination'}
      >
        <Icon name='arrowNext' width={15} height={15} color='white' />
      </Button>
      <Button
        onClick={lastPage}
        disabled={blockArea >= totalPages - PAGE_LIMIT}
        variant={'pagination'}
      >
        <Icon name='arrowNextBlock' width={15} height={15} color='white' />
      </Button>
    </div>
  );
};

export default Pagination;
