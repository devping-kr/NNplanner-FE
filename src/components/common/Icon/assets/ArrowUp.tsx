import { SVGProps } from 'react';

const Arrowup = ({
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
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.46967 6.47431C9.76256 6.18142 10.2374 6.18142 10.5303 6.47431L14.7803 10.7243C15.0732 11.0172 15.0732 11.4921 14.7803 11.785C14.4874 12.0779 14.0126 12.0779 13.7197 11.785L10 8.0653L6.28033 11.785C5.98744 12.0779 5.51256 12.0779 5.21967 11.785C4.92678 11.4921 4.92678 11.0172 5.21967 10.7243L9.46967 6.47431Z'
        fill={color}
      />
    </svg>
  );
};

export default Arrowup;
