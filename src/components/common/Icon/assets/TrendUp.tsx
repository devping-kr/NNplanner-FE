import { SVGProps } from 'react';

const TrendUp = ({ width = 20, color, ...props }: SVGProps<SVGSVGElement>) => {
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
      <g id='ic-trending-up-24px'>
        <path
          id='Path'
          d='M16 6.85139L18.29 9.31903L13.41 14.5776L9.41 10.2673L2 18.2629L3.41 19.7822L9.41 13.3168L13.41 17.6271L19.71 10.8492L22 13.3168V6.85139H16Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default TrendUp;
