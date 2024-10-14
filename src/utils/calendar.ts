import dayjs from 'dayjs';
import { CalendarInfo } from '@/type/mealType';
import { MajorCategory } from '@/type/menu/menuRequest';
import { FoodInfo, HospitalMenu } from '@/type/menu/menuResponse';
import { MAXIUM_MENU_PER_DAY } from '@/components/common/CalendarDay';

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

export const sumCalrories = (data: FoodInfo[]): number => {
  return data.reduce((total, item) => total + item.kcal, 0);
};

export const getCurrentYearMonthNow = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return { year, month, now };
};

export const getLastDateOfMonth = (year: number, month: number): number => {
  return dayjs(`${year}-${month}`).endOf('month').date();
};

/**
 * @description CalendarInfo 타입의 식단 데이터를 식단 저장 api request body 타입으로 변환하는 함수
 */
export const transformResponseToCalendar = (
  year: number,
  month: number,
  apiData: HospitalMenu[],
): CalendarInfo => {
  const calendarData: CalendarInfo = {};

  const startOfMonth = dayjs()
    .year(year)
    .month(month - 1)
    .startOf('month');

  apiData?.forEach((menu, index) => {
    const currentDate = startOfMonth.add(index, 'day');

    if (currentDate.month() !== month - 1) return;

    const formattedDate = currentDate.format('YYYY-MM-DD');

    const filteredFoods = menu.foods
      .filter((food) => food.foodName !== '없음') // '없음'을 필터링
      .map((food) => ({
        foodId: food.foodId,
        foodName: food.foodName,
        kcal: food.kcal,
        carbohydrate: food.carbohydrate,
        protein: food.protein,
        fat: food.fat,
      }));

    if (filteredFoods.length > 0) {
      calendarData[formattedDate] = {
        // TODO: schoolMenuId도 처리할 수 있게 수정
        hospitalMenuId: menu.hospitalMenuId,
        foods: filteredFoods,
      };
    }
  });

  return calendarData;
};

/**
 * @description 캘린더 데이터를 식단 저장 request 타입으로 변환
 */
export const transformCalendarToPostSave = (
  calendarData: CalendarInfo,
  monthMenuName: string,
  majorCategory: MajorCategory,
  minorCategory: string,
) => {
  const monthMenusSaveList = Object.entries(calendarData).map(
    ([menuDate, menuData]) => {
      const foodIds = menuData.foods
        .map((food) => food.foodId)
        .slice(0, MAXIUM_MENU_PER_DAY);

      return {
        // TODO: schoolMenuId로 들어올때도 고려
        hospitalMenuId: menuData.hospitalMenuId,
        menuDate,
        food1: foodIds[0] || null,
        food2: foodIds[1] || null,
        food3: foodIds[2] || null,
        food4: foodIds[3] || null,
        food5: foodIds[4] || null,
        food6: foodIds[5] || null,
        food7: foodIds[6] || null,
      };
    },
  );

  return {
    monthMenuName,
    majorCategory,
    minorCategory,
    monthMenusSaveList,
  };
};
