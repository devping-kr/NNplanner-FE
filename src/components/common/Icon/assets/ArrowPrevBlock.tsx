import { SVGProps } from 'react';

const ArrowPrevBlock = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M11 6L5 12L11 18M18 6L12 12L18 18'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ArrowPrevBlock;
