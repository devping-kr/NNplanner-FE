'use client';

import { useState } from 'react';
import { cn } from '@/utils/core';

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
      <button
        key={i + 1}
        onClick={() => {
          setPage(i + 1);
          // setSelection(new Set());
        }}
        aria-current={page === i + 1 ? 'page' : undefined}
        className={cn(
          'flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] bg-green-200 text-center text-white-100',
          page === i + 1 ? 'bg-green-400' : '',
        )}
      >
        {i + 1}
      </button>
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
      <button
        onClick={firstPage}
        disabled={blockNum === 0}
        className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] bg-green-200 text-center text-white-100 hover:bg-green-300 disabled:cursor-default disabled:hover:bg-green-200'
      >
        <span className=''>&lt;&lt;</span>
      </button>
      <button
        onClick={prevBtnHandler}
        disabled={page === 1}
        className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] bg-green-200 text-center text-white-100 hover:bg-green-300 disabled:cursor-default disabled:hover:bg-green-200'
      >
        &lt;
      </button>
      {sliceArr}
      <button
        onClick={nextBtnHandler}
        disabled={page === totalPages}
        className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] bg-green-200 text-center text-white-100 hover:bg-green-300 disabled:cursor-default disabled:hover:bg-green-200'
      >
        &gt;
      </button>
      <button
        onClick={lastPage}
        disabled={blockArea >= totalPages - 5}
        className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] bg-green-200 text-center text-white-100 hover:bg-green-300 disabled:cursor-default disabled:hover:bg-green-200'
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
