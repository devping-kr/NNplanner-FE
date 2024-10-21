import { SVGProps } from 'react';

const TrendDown = ({
  width = 20,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => {
  const aspectRatio = 24 / 27;
  const calculatedHeight = Number(width) / aspectRatio;
  return (
    <svg
      width={width}
      height={calculatedHeight}
      viewBox='0 0 24 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='ic-trending-down-24px'>
        <path
          id='Path'
          d='M16 19.7822L18.29 17.3146L13.41 12.0561L9.41 16.3663L2 8.37077L3.41 6.85139L9.41 13.3168L13.41 9.00653L19.71 15.7845L22 13.3168V19.7822H16Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default TrendDown;
