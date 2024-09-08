import { SVGProps } from 'react';

const Normal = ({
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
      <g id='Normal Square'>
        <path
          id='Stroke 1'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.3341 0.750122H5.66512C2.64412 0.750122 0.750122 2.88912 0.750122 5.91612V14.0841C0.750122 17.1111 2.63512 19.2501 5.66512 19.2501H14.3331C17.3641 19.2501 19.2501 17.1111 19.2501 14.0841V5.91612C19.2501 2.88912 17.3641 0.750122 14.3341 0.750122Z'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 3'
          d='M9.99475 14.0001V10.0001'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 2'
          d='M9.98987 6.20435H9.99987'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default Normal;
