import dayjs from 'dayjs';
import { CalendarInfo } from '@/type/mealType';
import { AutoDayMenus, MajorCategory } from '@/type/menu/menuRequest';
import { FoodInfo, MenuResponse, MonthMenu } from '@/type/menu/menuResponse';
import { formatFullDate } from '@/utils/dayjs';
import { removeTrailingZeros } from '@/utils/meal';
import { MAXIUM_MENU_PER_DAY } from '@/components/common/CalendarDay';
import { EMPTY_FOOD_ID, EMPTY_FOOD_NAME } from '@/constants/_meal';

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
  return data.reduce(
    (total, item) => total + removeTrailingZeros(item.kcal),
    0,
  );
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
 * @description 자동 식단 생성, 식단 상세 api response 데이터를 캘린더 데이터 타입으로 변환
 * @param type : 자동 식단 생성 | 식단 상세
 */
export const transformResponseToCalendar = (
  year: number,
  month: number,
  apiData: MenuResponse[] | MonthMenu[],
  type: 'auto' | 'detail' = 'auto',
): CalendarInfo => {
  const calendarData: CalendarInfo = {};

  const startOfMonth = dayjs()
    .year(year)
    .month(month - 1)
    .startOf('month');

  apiData.forEach((menu, index) => {
    const currentDate = startOfMonth.add(index, 'day');
    if (currentDate.month() !== month - 1) return;

    const formattedDate = formatFullDate(currentDate);

    const foodsField =
      type === 'auto'
        ? (menu as MenuResponse).foods
        : (menu as MonthMenu).foodList;
    const filteredFoods = foodsField
      .filter((food) => food.foodName !== EMPTY_FOOD_NAME)
      .map((food) => ({
        foodId: food.foodId,
        foodName: food.foodName,
        kcal: food.kcal,
        carbohydrate: food.carbohydrate,
        protein: food.protein,
        fat: food.fat,
      }));

    const menuDate = (menu as MonthMenu).menuDate;

    if (filteredFoods.length === 0) return null;

    if (type === 'auto') {
      calendarData[formattedDate] = {
        menuId: (menu as MenuResponse).menuId,
        foods: filteredFoods,
      };
    } else {
      calendarData[menuDate] = {
        menuId: (menu as MonthMenu).menuId,
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
  newCalendarData?: CalendarInfo,
) => {
  const monthMenusSaveList = Object.entries(calendarData).map(
    ([menuDate, menuData]) => {
      const newMenuData = newCalendarData?.[menuDate]; // 'b' 데이터가 있으면 가져오기
      const isFoodDifferent = newMenuData
        ? menuData.foods.some(
            (foodA, index) => foodA.foodId !== newMenuData.foods[index]?.foodId,
          )
        : false;

      const foodIds = (newMenuData || menuData).foods
        .map((food) => food.foodId)
        .slice(0, MAXIUM_MENU_PER_DAY);

      // food1~food7 무조건 넣고, foodId 없으면 EMPTY_FOOD_ID 설정
      const foodProperties: Record<string, string> = {
        food1: foodIds[0] || EMPTY_FOOD_ID,
        food2: foodIds[1] || EMPTY_FOOD_ID,
        food3: foodIds[2] || EMPTY_FOOD_ID,
        food4: foodIds[3] || EMPTY_FOOD_ID,
        food5: foodIds[4] || EMPTY_FOOD_ID,
        food6: foodIds[5] || EMPTY_FOOD_ID,
        food7: foodIds[6] || EMPTY_FOOD_ID,
      };

      return {
        menuId: isFoodDifferent ? null : menuData.menuId,
        menuDate,
        ...foodProperties,
      } as AutoDayMenus;
    },
  );

  return {
    monthMenuName,
    majorCategory,
    minorCategory,
    monthMenusSaveList,
  };
};

/**
 * @description 캘린더에 메뉴가 하나라도 있는지 확인
 * @param calendarInfo
 * @returns
 */
export const hasFoods = (calendarInfo: CalendarInfo): boolean => {
  return Object.keys(calendarInfo).some((menuDate) => {
    return calendarInfo[menuDate].foods.length > 0;
  });
};

/**
 * @description 식단의 createdAt에서 연 월 추출
 * @param createdAt
 * @returns
 */
export const getYearAndMonth = (createdAt: string) => {
  const date = new Date(createdAt);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return { year, month };
};

/**
 * @description 식단 데이터가 비어있는 지 확인
 * @param calendarData
 */
export const isAllFoodsEmpty = (calendarData: CalendarInfo): boolean => {
  return Object.values(calendarData).every(
    (dateData) => dateData.foods.length === 0,
  );
};

/**
 * @description 이전 달 날짜 계산
 * @param startOfMonth
 * @returns
 */
export const getPrevMonthDays = (startOfMonth: dayjs.Dayjs) => {
  return Array.from({ length: startOfMonth.day() }, (_, i) =>
    startOfMonth.subtract(startOfMonth.day() - i, 'day'),
  );
};

/**
 * @description 다음 달 날짜 계산
 * @param endOfMonth
 * @returns
 */
export const getNextMonthDays = (endOfMonth: dayjs.Dayjs) => {
  return Array.from({ length: 6 - endOfMonth.day() }, (_, i) =>
    endOfMonth.add(i + 1, 'day'),
  );
};

/**
 * @description 모든 날짜 계산
 * @param year
 * @param month
 * @returns
 */
export const getAllDays = (year: number, month: number) => {
  const days = getDaysInMonth(year, month);
  const startOfMonth = dayjs(new Date(year, month - 1)).startOf('month');
  const endOfMonth = startOfMonth.endOf('month');

  const prevMonthDays = getPrevMonthDays(startOfMonth);
  const nextMonthDays = getNextMonthDays(endOfMonth);

  return [...prevMonthDays, ...days, ...nextMonthDays];
};
