import { SVGProps } from 'react';

const Hide = ({ width, height, ...props }: SVGProps<SVGSVGElement>) => {
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
        d='M9.76069 14.3668C9.18569 13.7928 8.83569 13.0128 8.83569 12.1378C8.83569 10.3848 10.2477 8.9718 11.9997 8.9718C12.8667 8.9718 13.6647 9.3228 14.2297 9.8968'
        stroke='#79B669'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.1049 12.699C14.8729 13.989 13.8569 15.007 12.5679 15.241'
        stroke='#79B669'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.65463 17.4724C5.06763 16.2264 3.72363 14.4064 2.74963 12.1374C3.73363 9.85835 5.08663 8.02835 6.68363 6.77235C8.27063 5.51635 10.1016 4.83435 11.9996 4.83435C13.9086 4.83435 15.7386 5.52635 17.3356 6.79135'
        stroke='#79B669'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.4477 8.99084C20.1357 9.90484 20.7407 10.9598 21.2497 12.1368C19.2827 16.6938 15.8067 19.4388 11.9997 19.4388C11.1367 19.4388 10.2857 19.2988 9.46765 19.0258'
        stroke='#79B669'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.887 4.24963L4.11304 20.0236'
        stroke='#79B669'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Hide;
