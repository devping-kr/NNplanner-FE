import dayjs from 'dayjs';
import { NutritionData } from '@/components/shared/Meal/NutritionInfo';

export const getDaysInMonth = (year: number, month: number) => {
  const startOfMonth = dayjs(new Date(year, month - 1)).startOf('month');
  const endOfMonth = dayjs(new Date(year, month - 1)).endOf('month');

  const days = [];
  for (
    let date = startOfMonth;
    date.isBefore(endOfMonth) || date.isSame(endOfMonth);
    date = date.add(1, 'day')
  ) {
    days.push(date);
  }
  return days;
};

export const isHoliday = (date: dayjs.Dayjs) => {
  const holidays = [
    '01-01',
    '03-01',
    '05-05',
    '05-15',
    '06-06',
    '08-15',
    '10-03',
    '12-25',
  ];

  const dateString = date.format('MM-DD');
  return holidays.includes(dateString) || date.day() === 0; // 공휴일이거나 일요일인 경우
};

export const isInvalidDate = (
  date: dayjs.Dayjs,
  year: number,
  month: number,
) => {
  const firstDayOfMonth = dayjs(new Date(year, month - 1)).startOf('month');
  const lastDayOfMonth = dayjs(new Date(year, month - 1)).endOf('month');
  return (
    date.isBefore(firstDayOfMonth.startOf('month')) ||
    date.isAfter(lastDayOfMonth.endOf('month'))
  );
};

export const isValidDateString = (date: string): boolean => {
  return dayjs(date, 'YYYY-MM-DD', true).isValid();
};

export const sumCalrories = (data: NutritionData[]): number => {
  return data.reduce((total, item) => total + item.kcal, 0);
};

export const getCurrentYearMonthNow = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return { year, month, now };
};
