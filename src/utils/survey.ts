import { surveyType } from '@/type/survey/surveyResponse';

/**
 * @description 설문이 언제 생성되었는지 createdAt으로 판단
 * @param createdAt
 * @returns
 */
export const isCreatedThisMonthOrLast = (
  createdAt: string,
): 'THIS_MONTH' | 'LAST_MONTH' | 'OTHER' => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const [createdYear, createdMonth] = [
    createdDate.getFullYear(),
    createdDate.getMonth(),
  ];
  const [currentYear, currentMonth] = [now.getFullYear(), now.getMonth()];

  if (createdYear === currentYear && createdMonth === currentMonth) {
    return 'THIS_MONTH';
  }

  // 이전 달에 생성된 경우 (연초일 때 작년 12월까지 고려)
  if (
    (createdYear === currentYear && createdMonth === currentMonth - 1) ||
    (currentMonth === 0 &&
      createdYear === currentYear - 1 &&
      createdMonth === 11)
  ) {
    return 'LAST_MONTH';
  }

  // 그 외의 경우
  return 'OTHER';
};

/**
 * @description 이번 달과 지난 달에 생성된 설문 개수 리턴
 */
export const countSurveysByMonth = (
  surveys: surveyType[],
): { thisMonth: number; lastMonth: number } => {
  return surveys.reduce(
    (acc, survey) => {
      const result = isCreatedThisMonthOrLast(survey.createdAt);

      if (result === 'THIS_MONTH') {
        acc.thisMonth++;
      } else if (result === 'LAST_MONTH') {
        acc.lastMonth++;
      }

      return acc;
    },
    { thisMonth: 0, lastMonth: 0 },
  );
};

/**
 * @description 지난 달 대비 이번 달 데이터 증가율 계산 함수
 * @param current
 * @param previous
 * @returns
 */
export const calculateUpdownPercent = (
  current: number,
  previous: number,
): number => {
  if (previous === 0) {
    return current > 0 ? 100 : 0; // 이전 데이터가 없을 경우 처리
  }
  return Math.floor(((current - previous) / previous) * 100);
};
