'use client';

import { useState } from 'react';
import { cn } from '@/utils/core';
import Button from '../Button/Button';

interface Props {
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPosts: number;
  // setSelection: Dispatch<SetStateAction<Set<unknown>>>;
}

const Pagination = ({
  limit,
  page,
  setPage,
  totalPosts,
  // setSelection,
}: Props) => {
  const [blockNum, setBlockNum] = useState(0);
  const pageLimit = 5;
  const blockArea = Number(blockNum * pageLimit);
  const totalPages = Math.ceil(totalPosts / limit);
  const createArr = Array(totalPages)
    .fill(0)
    .map((_, i) => (
      <Button
        key={i + 1}
        onClick={() => setPage(i + 1)}
        aria-current={page === i + 1 ? 'page' : undefined}
        variant={'pagination'}
        className={cn(
          '',
          page === i + 1 ? 'bg-green-400 hover:bg-green-400' : '',
        )}
      >
        {i + 1}
      </Button>
    ));

  const sliceArr = createArr.slice(blockArea, Number(pageLimit) + blockArea);

  const firstPage = () => {
    setPage(1);
    setBlockNum(0);
    // setSelection(new Set());
  };

  const lastPage = () => {
    setPage(totalPages);
    setBlockNum(Math.ceil(totalPages / pageLimit) - 1);
    // setSelection(new Set());
  };

  const prevBtnHandler = () => {
    if (page <= 1) {
      return;
    }
    if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((num) => num - 1);
      // setSelection(new Set());
    }
    setPage((num) => num - 1);
  };

  const nextBtnHandler = () => {
    if (page >= totalPages) {
      return;
    }
    if (pageLimit * Number(blockNum + 1) < Number(page + 1)) {
      setBlockNum((num) => num + 1);
      // setSelection(new Set());
    }
    setPage((num) => num + 1);
  };

  return (
    <div className='flex w-full items-center justify-center gap-2'>
      <Button
        onClick={firstPage}
        disabled={blockNum === 0}
        variant={'pagination'}
      >
        &lt;&lt;
      </Button>
      <Button
        onClick={prevBtnHandler}
        disabled={page === 1}
        variant={'pagination'}
      >
        &lt;
      </Button>
      {sliceArr}
      <Button
        onClick={nextBtnHandler}
        disabled={page === totalPages}
        variant={'pagination'}
      >
        &gt;
      </Button>
      <Button
        onClick={lastPage}
        disabled={blockArea >= totalPages - 5}
        variant={'pagination'}
      >
        &gt;&gt;
      </Button>
    </div>
  );
};

export default Pagination;
