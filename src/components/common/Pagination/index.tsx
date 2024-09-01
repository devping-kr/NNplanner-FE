import Link from 'next/link';
import Icon from '../Icon';
import { CAL_PAGE_NUM } from '@/constants/_pagination';

interface Props {
  totalPosts: number;
  currentPage: number;
  pageSize: number;
  category: string;
}

const Pagination = ({ totalPosts, currentPage, pageSize, category }: Props) => {
  const totalPages = Math.ceil(totalPosts / pageSize);

  const floorFive = pageSize * Math.floor(currentPage / pageSize);
  const ceilFive = pageSize * Math.ceil(currentPage / pageSize);

  const prevPage = floorFive - CAL_PAGE_NUM.FIRST_PAGE;
  const nextPage = ceilFive + CAL_PAGE_NUM.LAST_PAGE;

  const startPage = ceilFive - CAL_PAGE_NUM.FIRST_PAGE;

  const generatePageLinks = (currentPage: number) => {
    const links = [];

    const lastPage =
      totalPages >= ceilFive ? startPage + CAL_PAGE_NUM.FIRST_PAGE : totalPages;
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
      {!(currentPage <= pageSize) && (
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
      {!(totalPages < ceilFive) && (
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
