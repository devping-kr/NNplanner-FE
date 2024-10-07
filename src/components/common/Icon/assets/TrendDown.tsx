import { SVGProps } from 'react';

const TrendDown = ({
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
        d='M18.7375 18.3882L21.4193 16.1124L15.7043 11.2627L11.0199 15.2379L2.3421 7.86404L3.99335 6.46271L11.0199 12.4255L15.7043 8.45032L23.0823 14.7012L25.7641 12.4255V18.3882H18.7375Z'
        fill={color}
      />
    </svg>
  );
};

export default TrendDown;
