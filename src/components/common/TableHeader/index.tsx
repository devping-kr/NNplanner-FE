type TableHeaderProps = {
  headerData: string[];
};

const TableHeader = ({ headerData }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {headerData.map((header) => (
          <th
            key={header}
            className='border-thead border bg-gray-100 p-3 font-semibold'
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
