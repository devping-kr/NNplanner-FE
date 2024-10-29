import { SVGProps } from 'react';

const Profile = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement> & { color?: string; className?: string }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect
        x='1.25'
        y='1.25'
        width='25.5'
        height='25.5'
        rx='8.75'
        stroke={color}
        strokeWidth='1.75'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.9848 17.3462C10.1172 17.3462 6.81433 17.931 6.81433 20.2729C6.81433 22.6148 10.0962 23.2205 13.9848 23.2205C17.8524 23.2205 21.1543 22.6348 21.1543 20.2938C21.1543 17.9529 17.8734 17.3462 13.9848 17.3462Z'
        stroke={color}
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.9848 14.0059C16.5229 14.0059 18.58 11.9478 18.58 9.40969C18.58 6.8716 16.5229 4.81445 13.9848 4.81445C11.4467 4.81445 9.38858 6.8716 9.38858 9.40969C9.38001 11.9392 11.4238 13.9973 13.9524 14.0059H13.9848Z'
        stroke={color}
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Profile;
