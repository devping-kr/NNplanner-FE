import { SVGProps } from 'react';

const Calendar = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement> & { color?: string; className?: string }) => {
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
        d='M5.62433 2.49526V4.37026M14.3746 2.49414V4.36914M2.49805 15.618V6.24288C2.49805 5.2074 3.33755 4.36797 4.37313 4.36797H15.623C16.6585 4.36797 17.498 5.2074 17.498 6.24289V15.618M2.49805 15.618C2.49805 16.6535 3.33755 17.493 4.37313 17.493H15.623C16.6585 17.493 17.498 16.6535 17.498 15.618M2.49805 15.618V9.36829C2.49805 8.3328 3.33755 7.49337 4.37313 7.49337H15.623C16.6585 7.49337 17.498 8.3328 17.498 9.36829V15.618M11.873 10.6182H13.748M6.24802 12.4932H9.99802M9.9998 10.6182H10.0045V10.6229H9.9998V10.6182ZM9.9992 14.3684H10.0039V14.3731H9.9992V14.3684ZM8.1239 14.369H8.12859V14.3737H8.1239V14.369ZM6.24862 14.3684H6.2533V14.3731H6.24862V14.3684ZM11.8739 12.4963H11.8786V12.501H11.8739V12.4963ZM11.8745 14.369H11.8792V14.3737H11.8745V14.369ZM13.7498 12.4951H13.7545V12.4998H13.7498V12.4951Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Calendar;
