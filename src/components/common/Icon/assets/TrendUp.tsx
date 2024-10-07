import { SVGProps } from 'react';

const TrendUp = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 29 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M18.7375 6.6118L21.4193 8.88758L15.7043 13.7373L11.0199 9.76211L2.3421 17.136L3.99335 18.5373L11.0199 12.5745L15.7043 16.5497L23.0823 10.2988L25.7641 12.5745V6.6118H18.7375Z'
        fill={color}
      />
    </svg>
  );
};

export default TrendUp;
