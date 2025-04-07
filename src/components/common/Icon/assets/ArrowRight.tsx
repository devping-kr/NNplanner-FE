import { SVGProps } from 'react';

const ArrowRight = ({
  width,
  height,
  color,
  className,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <path
        d='M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ArrowRight;
