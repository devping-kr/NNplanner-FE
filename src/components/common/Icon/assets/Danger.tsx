import { SVGProps } from 'react';

const Danger = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='Danger Triangle'>
        <path
          id='Stroke 1'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.81397 17.4368H17.197C18.779 17.4368 19.772 15.7267 18.986 14.3527L11.8 1.78775C11.009 0.40475 9.01497 0.40375 8.22297 1.78675L1.02497 14.3518C0.238969 15.7258 1.23097 17.4368 2.81397 17.4368Z'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 3'
          d='M10.0024 10.4147V7.3147'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 2'
          d='M9.995 13.5H10.005'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default Danger;
