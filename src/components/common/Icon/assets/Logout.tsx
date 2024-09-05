import { SVGProps } from 'react';

const Logout = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='Logout'>
        <path
          id='Stroke 1'
          d='M13.016 5.38948V4.45648C13.016 2.42148 11.366 0.771484 9.33097 0.771484H4.45597C2.42197 0.771484 0.771973 2.42148 0.771973 4.45648V15.5865C0.771973 17.6215 2.42197 19.2715 4.45597 19.2715H9.34097C11.37 19.2715 13.016 17.6265 13.016 15.5975V14.6545'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 3'
          d='M19.8094 10.0214H7.76843'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          id='Stroke 5'
          d='M16.8812 7.10632L19.8092 10.0213L16.8812 12.9373'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default Logout;
