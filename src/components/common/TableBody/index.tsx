import React from 'react';

type Data = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

export type DataList = Data[];
interface Props {
  data: DataList;
}
const TableBody = ({ data }: Props) => {
  return (
    <tbody>
      {data.map((item, idx) => (
        <tr
          key={idx}
          className='flex h-14 w-full items-center justify-between border-b-[1px] border-thead bg-tableHeader px-3 text-xs'
        >
          {Object.entries(item).map(([key, value]) => {
            return (
              <th key={key} className='font-normal'>
                {value}
              </th>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
