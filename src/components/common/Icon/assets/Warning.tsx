import { SVGProps } from 'react';

const Warning = ({
  width,
  height,
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
      <g id='Danger Circle'>
        <path
          id='Stroke 1'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.0001 0.750122C15.1081 0.750122 19.2501 4.89112 19.2501 10.0001C19.2501 15.1081 15.1081 19.2501 10.0001 19.2501C4.89112 19.2501 0.750122 15.1081 0.750122 10.0001C0.750122 4.89112 4.89112 0.750122 10.0001 0.750122Z'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 3'
          d='M9.99524 6.20422V10.6232'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 5'
          d='M9.995 13.7961H10.005'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default Warning;
