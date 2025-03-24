import { SVGProps } from 'react';

const TableCells = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M11.25 65H68.75M11.25 65C9.17893 65 7.5 63.3211 7.5 61.25M11.25 65H36.25C38.3211 65 40 63.3211 40 61.25M7.5 61.25V18.75M7.5 61.25V56.25C7.5 54.1789 9.17893 52.5 11.25 52.5M72.5 61.25V18.75M72.5 61.25C72.5 63.3211 70.8211 65 68.75 65M72.5 61.25V56.25C72.5 54.1789 70.8211 52.5 68.75 52.5M68.75 65H43.75C41.6789 65 40 63.3211 40 61.25M72.5 18.75C72.5 16.6789 70.8211 15 68.75 15H11.25C9.17893 15 7.5 16.6789 7.5 18.75M72.5 18.75V23.75C72.5 25.8211 70.8211 27.5 68.75 27.5M7.5 18.75V23.75C7.5 25.8211 9.17893 27.5 11.25 27.5M11.25 27.5H68.75M11.25 27.5H36.25C38.3211 27.5 40 29.1789 40 31.25M11.25 27.5C9.17893 27.5 7.5 29.1789 7.5 31.25V36.25C7.5 38.3211 9.17893 40 11.25 40M68.75 27.5H43.75C41.6789 27.5 40 29.1789 40 31.25M68.75 27.5C70.8211 27.5 72.5 29.1789 72.5 31.25V36.25C72.5 38.3211 70.8211 40 68.75 40M11.25 40H36.25M11.25 40C9.17893 40 7.5 41.6789 7.5 43.75V48.75C7.5 50.8211 9.17893 52.5 11.25 52.5M40 36.25V31.25M40 36.25C40 38.3211 38.3211 40 36.25 40M40 36.25C40 38.3211 41.6789 40 43.75 40M36.25 40C38.3211 40 40 41.6789 40 43.75M43.75 40H68.75M43.75 40C41.6789 40 40 41.6789 40 43.75M68.75 40C70.8211 40 72.5 41.6789 72.5 43.75V48.75C72.5 50.8211 70.8211 52.5 68.75 52.5M11.25 52.5H36.25M40 48.75V43.75M40 48.75C40 50.8211 38.3211 52.5 36.25 52.5M40 48.75C40 50.8211 41.6789 52.5 43.75 52.5M36.25 52.5C38.3211 52.5 40 54.1789 40 56.25M40 61.25V56.25M40 56.25C40 54.1789 41.6789 52.5 43.75 52.5M43.75 52.5H68.75'
        stroke={color}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default TableCells;
