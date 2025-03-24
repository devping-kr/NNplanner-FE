import { SVGProps } from 'react';

const Squares2x2 = ({
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
        d='M12.5 20C12.5 15.8579 15.8579 12.5 20 12.5H27.5C31.6421 12.5 35 15.8579 35 20V27.5C35 31.6421 31.6421 35 27.5 35H20C15.8579 35 12.5 31.6421 12.5 27.5V20Z'
        stroke={color}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.5 52.5C12.5 48.3579 15.8579 45 20 45H27.5C31.6421 45 35 48.3579 35 52.5V60C35 64.1421 31.6421 67.5 27.5 67.5H20C15.8579 67.5 12.5 64.1421 12.5 60V52.5Z'
        stroke={color}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M45 20C45 15.8579 48.3579 12.5 52.5 12.5H60C64.1421 12.5 67.5 15.8579 67.5 20V27.5C67.5 31.6421 64.1421 35 60 35H52.5C48.3579 35 45 31.6421 45 27.5V20Z'
        stroke={color}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M45 52.5C45 48.3579 48.3579 45 52.5 45H60C64.1421 45 67.5 48.3579 67.5 52.5V60C67.5 64.1421 64.1421 67.5 60 67.5H52.5C48.3579 67.5 45 64.1421 45 60V52.5Z'
        stroke={color}
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Squares2x2;
