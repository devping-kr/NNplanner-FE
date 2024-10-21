import { SVGProps } from 'react';

const Group = ({ width = 20, color, ...props }: SVGProps<SVGSVGElement>) => {
  const aspectRatio = 60 / 61;
  const calculatedHeight = Number(width) / aspectRatio;

  return (
    <svg
      width={width}
      height={calculatedHeight}
      viewBox='0 0 60 61'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='Icon'>
        <path
          id='Circle 2'
          opacity='0.21'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0 30.5V37.5C0 50.2025 10.2975 60.5 23 60.5H30H37C49.7025 60.5 60 50.2025 60 37.5V30.5V23.5C60 10.7975 49.7025 0.5 37 0.5H30H23C10.2975 0.5 0 10.7975 0 23.5V30.5Z'
          fill={color}
        />
        <g id='Group'>
          <path
            id='Combined Shape'
            opacity='0.587821'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M20.6667 23.8333C20.6667 26.7789 23.0545 29.1667 26 29.1667C28.9455 29.1667 31.3333 26.7789 31.3333 23.8333C31.3333 20.8878 28.9455 18.5 26 18.5C23.0545 18.5 20.6667 20.8878 20.6667 23.8333ZM34 29.1667C34 31.3758 35.7909 33.1667 38 33.1667C40.2091 33.1667 42 31.3758 42 29.1667C42 26.9575 40.2091 25.1667 38 25.1667C35.7909 25.1667 34 26.9575 34 29.1667Z'
            fill={color}
          />
          <path
            id='Combined Shape_2'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M25.9778 31.8334C19.6826 31.8334 14.5177 35.0687 14.0009 41.4323C13.9727 41.7789 14.6356 42.5 14.97 42.5H36.9956C37.9972 42.5 38.0128 41.694 37.9972 41.4334C37.6065 34.891 32.3616 31.8334 25.9778 31.8334ZM45.2746 42.5L40.1333 42.5C40.1333 39.4988 39.1417 36.7292 37.4683 34.5009C42.0103 34.5505 45.7189 36.8469 45.998 41.7C46.0092 41.8955 45.998 42.5 45.2746 42.5Z'
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default Group;
