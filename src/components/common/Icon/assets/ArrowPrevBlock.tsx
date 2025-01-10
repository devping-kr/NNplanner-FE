import { SVGProps } from 'react';

const ArrowPrevBlock = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.66399 11.4697C5.31252 11.7626 5.31252 12.2374 5.66399 12.5303L10.764 16.7803C11.1155 17.0732 11.6853 17.0732 12.0368 16.7803C12.3883 16.4874 12.3883 16.0126 12.0368 15.7197L7.57318 12L12.0368 8.28033C12.3883 7.98744 12.3883 7.51256 12.0368 7.21967C11.6853 6.92678 11.1155 6.92678 10.764 7.21967L5.66399 11.4697ZM16.764 7.21967L11.664 11.4697C11.3125 11.7626 11.3125 12.2374 11.664 12.5303L16.764 16.7803C17.1155 17.0732 17.6853 17.0732 18.0368 16.7803C18.3883 16.4874 18.3883 16.0126 18.0368 15.7197L13.5732 12L18.0368 8.28033C18.3883 7.98744 18.3883 7.51256 18.0368 7.21967C17.6853 6.92678 17.1155 6.92678 16.764 7.21967Z'
        stroke='none'
        fill={color}
      />
    </svg>
  );
};

export default ArrowPrevBlock;
