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
            className='border border-thead bg-thead p-3 font-semibold'
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
