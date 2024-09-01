import { SVGProps } from 'react';

const Xmark = ({
  width = 20,
  height = 20,
  color = '#000',
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 -960 960 960'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
    </svg>
  );
};

export default Xmark;
