import { SVGProps } from 'react';

const ArrowNext = ({
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
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.86321 6.2636C10.2147 5.91213 10.7845 5.91213 11.136 6.2636L16.236 11.3636C16.5875 11.7151 16.5875 12.2849 16.236 12.6364L11.136 17.7364C10.7845 18.0879 10.2147 18.0879 9.86321 17.7364C9.51174 17.3849 9.51174 16.8151 9.86321 16.4636L14.3268 12L9.86321 7.5364C9.51174 7.18492 9.51174 6.61508 9.86321 6.2636Z'
        stroke='none'
        fill={color}
      />
    </svg>
  );
};

export default ArrowNext;
