import { SVGProps } from 'react';

const ArrowPrev = ({
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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.1364 6.2636C14.4879 6.61508 14.4879 7.18492 14.1364 7.5364L9.67279 12L14.1364 16.4636C14.4879 16.8151 14.4879 17.3849 14.1364 17.7364C13.7849 18.0879 13.2151 18.0879 12.8636 17.7364L7.7636 12.6364C7.41213 12.2849 7.41213 11.7151 7.7636 11.3636L12.8636 6.2636C13.2151 5.91213 13.7849 5.91213 14.1364 6.2636Z'
        fill={color}
      />
    </svg>
  );
};

export default ArrowPrev;
