import { SVGProps } from 'react';

const ChartPie = ({
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
        d='M35 20C21.1929 20 10 31.1929 10 45C10 58.8071 21.1929 70 35 70C48.8071 70 60 58.8071 60 45H35V20Z'
        stroke={color}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M45 35H70C70 21.1929 58.8071 10 45 10V35Z'
        stroke={color}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ChartPie;
