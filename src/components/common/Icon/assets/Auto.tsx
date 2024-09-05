import { SVGProps } from 'react';

const Auto = ({
  width = 20,
  height = 20,
  color,
  ...props
}: SVGProps<SVGSVGElement> & { color?: string; className?: string }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='Iconly/Regular/Light/Activity'>
        <g id='Activity'>
          <path
            id='Path_33966'
            d='M7.24487 14.7816L10.238 10.8914L13.6522 13.5734L16.5813 9.79303'
            stroke={color}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle
            id='Ellipse_741'
            cx='19.9954'
            cy='4.20036'
            r='1.9222'
            stroke={color}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            id='Path'
            d='M14.9245 3.12027H7.65679C4.64535 3.12027 2.77808 5.25299 2.77808 8.26443V16.3468C2.77808 19.3583 4.60874 21.4818 7.65679 21.4818H16.2609C19.2724 21.4818 21.1396 19.3583 21.1396 16.3468V9.30791'
            stroke={color}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
    </svg>
  );
};

export default Auto;
