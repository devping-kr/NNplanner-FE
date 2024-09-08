import { SVGProps } from 'react';

const Success = ({
  width = 20,
  height = 20,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='Success Square'>
        <path
          id='Stroke 1'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.3344 0.750244H5.66537C2.64437 0.750244 0.750366 2.88924 0.750366 5.91624V14.0842C0.750366 17.1112 2.63537 19.2502 5.66537 19.2502H14.3334C17.3644 19.2502 19.2504 17.1112 19.2504 14.0842V5.91624C19.2504 2.88924 17.3644 0.750244 14.3344 0.750244Z'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 3'
          d='M6.43982 10.0002L8.81382 12.3732L13.5598 7.6272'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default Success;
