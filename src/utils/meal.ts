import { Option } from '@/components/common/Selectbox';

/**
 * @description 소수점이 전부 0인 숫자들 정수로 변환 (메뉴 영양 정보 값)
 * @example 84.000 -> 84
 */
export const removeTrailingZeros = (value: number): number => {
  const stringValue = typeof value === 'number' ? value.toString() : value;

  if (stringValue.includes('.')) {
    const [integerPart, decimalPart] = stringValue.split('.');
    if (parseInt(decimalPart, 10) === 0) {
      return Number(integerPart);
    }
  }

  return Number(stringValue);
};

/**
 * @description api response로 받은 string 배열을 selectbox options 타입으로 변환
 * @example ['A학교', 'B학교'] -> [{value: 'A학교', label: 'A학교'} , {value: 'B학교', label: 'B학교'}]
 */
export const stringArraytoOptionArray = (items: string[]): Option[] =>
  items.map((item) => ({
    value: item,
    label: item,
  }));
