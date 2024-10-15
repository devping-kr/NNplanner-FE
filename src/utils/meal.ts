/**
 * @description 소수점이 전부 0인 숫자들 정수로 변환 (메뉴 영양 정보 값)
 * @example 84.000 -> 84
 * @param value
 * @returns
 */
export function removeTrailingZeros(value: number): number {
  const stringValue = typeof value === 'number' ? value.toString() : value;

  if (stringValue.includes('.')) {
    const [integerPart, decimalPart] = stringValue.split('.');
    if (parseInt(decimalPart, 10) === 0) {
      return Number(integerPart);
    }
  }

  return Number(stringValue);
}
