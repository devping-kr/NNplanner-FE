import dayjs from 'dayjs';

/**
 * @description 날짜를 'YYYY-MM-DD' 형식으로 포맷
 * @param date - 포맷할 날짜 (dayjs 객체 또는 문자열, Date 객체 등)
 * @returns 포맷된 날짜 문자열
 */
export const formatFullDate = (date: dayjs.ConfigType): string => {
  return dayjs(date).format('YYYY-MM-DD');
};
