import React, { SVGProps } from 'react';

const Envelope = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M21.75 7.25V17.75C21.75 18.9926 20.7426 20 19.5 20H4.5C3.25736 20 2.25 18.9926 2.25 17.75V7.25M21.75 7.25C21.75 6.00736 20.7426 5 19.5 5H4.5C3.25736 5 2.25 6.00736 2.25 7.25M21.75 7.25V7.49271C21.75 8.27405 21.3447 8.99945 20.6792 9.40894L13.1792 14.0243C12.4561 14.4694 11.5439 14.4694 10.8208 14.0243L3.32078 9.40894C2.65535 8.99945 2.25 8.27405 2.25 7.49271V7.25'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Envelope;
