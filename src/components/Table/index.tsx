'use client';

import { useMemo } from 'react';

type TableProps = {
  data: Record<string, string | number>;
};

const Table = ({ data }: TableProps) => {
  const headers = useMemo(() => Object.keys(data), [data]);

  return (
    <div className='overflow-hidden rounded-md'>
      <table className='w-full text-center border-collapse'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className='bg-thead border border-thead p-3 font-semibold'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map((header) => (
              <td key={header} className='bg-primary p-3 border border-x-thead'>
                {data[header] ?? '-'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
