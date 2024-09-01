import Link from 'next/link';
import React from 'react';
import Icon from '../Icon';

interface Props {
  totalPosts: number;
  currentPage: number;
  pageSize: number;
  category: string;
}

const Pagination = ({ totalPosts, currentPage, pageSize, category }: Props) => {
  const totalPages = Math.ceil(totalPosts / pageSize);

  const floorFive = 5 * Math.floor(currentPage / 5);
  const ceilFive = 5 * Math.ceil(currentPage / 5);

  const prevPage = floorFive - 4;
  const nextPage = ceilFive + 1;

  const startPage = ceilFive - 4;

  const generatePageLinks = (currentPage: number) => {
    const links = [];

    const lastPage = totalPages >= ceilFive ? startPage + 4 : totalPages;
    for (let i = startPage; i <= lastPage; i++) {
      links.push(
        <Link
          key={i}
          href={{
            pathname: `${category}`,
            query: { page: `${i}` },
          }}
          className={`mx-1 w-10 rounded-full p-2 text-center hover:bg-navAction hover:text-white ${
            i === currentPage ? 'bg-navActionActive text-white' : ''
          }`}
        >
          {i}
        </Link>,
      );
    }
    return links;
  };

  return (
    <div className='flex items-center justify-center p-2'>
      {currentPage <= 5 ? null : (
        <Link
          className='m-2 flex justify-center rounded-full p-2 text-center hover:bg-navAction'
          href={{
            pathname: `/${category}`,
            query: { page: `${prevPage}` },
          }}
        >
          <Icon name='arrowPrev' width={15} height={15} />
        </Link>
      )}
      {generatePageLinks(currentPage)}
      {totalPages < ceilFive ? null : (
        <Link
          className='m-2 flex justify-center rounded-full p-2 text-center hover:bg-navAction'
          href={{
            pathname: `/${category}`,
            query: { page: `${nextPage}` },
          }}
        >
          <Icon name='arrowNext' width={15} height={15} />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
